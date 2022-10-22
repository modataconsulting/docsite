---
sidebar_position: 1
---

# Overview

Here you will find the high level overview of this project.

First and foremost, this project is based off of the dbt [GA4 Package by Velir](https://hub.getdbt.com/velir/ga4/latest), but has been modified and refactored for internal purposes.
This project uses [Google Analytics 4 BigQuery Exports](https://support.google.com/analytics/topic/9359001) as its source data, and offers useful base transformations to provide report-ready dimension & fact models that can be used for reporting purposes, blending with other data, and/or feature engineering for ML models.

Find more info about Google Analytics 4 BigQuery Exports [here](https://developers.google.com/analytics/bigquery).

## Features Overview

- Four final tables (`ga4__events`, `ga4__pages`, `ga4__sesssions`, and `ga4__users`) that are completed unnested to be wide & denomalized for easy querying by the end-user.
- Conversion of the the day-shared `events_YYYYMMDD` & `events_intraday_YYYYMMDD` tables into singular date-partitionioned incremental base models.
- Dynamically flattens `event_params` into their own individual columns.
- Dynamically flattens `user_props` into their own individual columns.
- Dynamically extracts & flattens URL `query_params` (e.g., `gclid`, `fbclid`, `_ga`) into their own individual columns.
- Custom `Variables`. See [here](./config) for more info.
- Custom `Marcros`. See [here](./macros) for more info.

## Quick Links

- [Installation & Configuration](./config)
- [Models](./models)
- [Macros](./macros)
- [Resources](./resources)
