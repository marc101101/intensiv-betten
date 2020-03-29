import { diviEntry } from "../models/models";
import { logger } from "../helpers";
const HTMLParser = require("node-html-parser");
const FormData = require("form-data");
const request = require("request");

export class CollectIntensivBettenClient {
  private root;
  private options = {
    method: "POST",
    url: "https://www.divi.de/register/intensivregister?view=items",
    headers: {
      Connection: "keep-alive",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      Origin: "https://www.divi.de",
      "Upgrade-Insecure-Requests": "1",
      "Content-Type": [
        "application/x-www-form-urlencoded",
        "application/x-www-form-urlencoded"
      ],
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
      "Sec-Fetch-Dest": "document",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      Referer: "https://www.divi.de/register/intensivregister?view=items",
      "Accept-Language": "en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-DE;q=0.6",
      Cookie: [
        "a649c1cc4076d386bf660796594a190f=4c10bugohhq0k67a5pbafsjoo8; _ga=GA1.2.1285791634.1585121364; _gid=GA1.2.724924830.1585121364; cpnb_cookiesSettings=%7B%7D; cookiesDirective=1; referrer_site=https%3A%2F%2Fwww.divi.de%2Fregister%2Faktuelle-informationen; csrf_token=5404df136f1f513f56e6e734239b0f0a2ca84505",
        "a649c1cc4076d386bf660796594a190f=438joc3fnt04pf01vp4hkrl6ft"
      ]
    },
    form: {
      "filter[search]": "",
      "list[fullordering]": "a.title+ASC",
      "list[limit]": "1000",
      "filter[federalstate]": "0",
      "filter[chronosort]": "0",
      "filter[icu_highcare_state]": "",
      "filter[ecmo_state]": "",
      "filter[ards_network]": "",
      limitstart: "0",
      task: "",
      boxchecked: "0",
      "09ec9b26f46191a5f3d288c850375e54": "1"
    }
  };

  public async collectIntensivBetten(): Promise<Array<diviEntry>> {
    let htmlData = await this.getCurrentData();
    this.root = await HTMLParser.parse(htmlData);

    let row0 = this.extractData(".row1");
    let row1 = this.extractData(".row0");

    return row0.concat(row1);
  }

  private async getCurrentData(): Promise<any> {
    var self = this;
    return new Promise(function(resolve, reject) {
      request(self.options, function(error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  private getStatus(element) {
    let status = element.childNodes[1].classNames[0];

    if (status.includes("red")) {
      return "red";
    }
    if (status.includes("green")) {
      return "green";
    }
    if (status.includes("yellow")) {
      return "yellow";
    }
    return undefined;
  }

  private extractData(htmlElement) {
    let root_data = [];
    this.root.querySelectorAll(htmlElement).forEach(element => {
      let data = {
        hospital: element.childNodes[1].structuredText.replace(
          /(\r\n|\n|\r)/gm,
          ", "
        ),
        contact: element.childNodes[3].structuredText
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace("wesbite", ""),
        fed: element.childNodes[5].structuredText,
        icu_low_care: this.getStatus(element.childNodes[7]),
        icu_high_care: this.getStatus(element.childNodes[9]),
        ecmo: this.getStatus(element.childNodes[11]),
        updated: element.childNodes[13].structuredText.replace(
          /(\r\n|\n|\r)/gm,
          ", "
        )
      };
      root_data.push(data);
    });
    return root_data;
  }
}
