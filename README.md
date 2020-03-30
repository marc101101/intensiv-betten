![Upload Website](https://github.com/marc101101/intensiv-betten/workflows/Upload%20Website/badge.svg?branch=master)

# Intensiv - Beds

This project collects data on the situation of intensive care beds in German hospitals.

## Project Structure

- ./app - vue.js based frontend application :construction:
- ./data_analytics - jupyter notebooks to research the data :construction:
- ./data_storage - clone of s3 bucket (updated asap) :white_check_mark:
- ./data_collector - data parsing & collection service :white_check_mark 

## Design Prototype 

<a>
<img align="left" src="https://i.imgur.com/AfINK1E.png" alt="" />
</a><br><br>

## Data

Example data:

./data_storage/register

```json
[
  {
    "hospital": "Klinikum Bamberg Medizinische Klinik I/Intensivstation II, Medizinische Klinik I, Buger Straße 80, 96049 Bamberg",
    "contact": "Intensivstation II Website",
    "fed": "BY",
    "icu_low_care": "green",
    "icu_high_care": "green",
    "ecmo": "green",
    "updated": "26.03.2020, 17:09"
  }
]
```

./data_storage/capacity

```json
[
  {
    "lat": 50.884082549873,
    "lon": 8.01902496818,
    "COVID-19 aktuell": 0,
    "Klinikname": "DRK Kinderklinik"
  }
]
```

¹ ICU low care: Intensivbetten ohne invasive Beatmungsmöglichkeit (Monitoring, Überwachung, ggf. nicht-invasive Beatmung möglich)
² ICU high care: Intensivbetten mit invasiver Beatmungsmöglichkeit (Beatmungsbetten)
³ ECMO = Zusätzlich ECMO

"green": Verfügbar

"yellow": Begrenzt

"red": Ausgelastet

## Installation

You can compile the ts files in this directory by 1st installing typescript via

```bash
npm install
```

## Development

The project is built with `make`.

### Information about the make targets

```bash
make help
```

### Playground

Docker is used for build environment.

```bash
make bash
```

### Debugging

Here VSCode Debugging by invoking the AWS lambda locally with the serverless framwork (see ./vscode).
