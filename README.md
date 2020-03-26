# Intensiv - Beds

This project collects data on the situation of intensive care beds in German hospitals.

## Project Structure

- ./app - vue.js based frontend application
- ./data_analytics - jupyter notebooks to research the data
- ./data_storage - clone of s3 bucket (updated asap)
- ./data_collector - data parsing & collection service

## Data

Example data:

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
