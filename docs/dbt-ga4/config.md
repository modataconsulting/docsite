---
sidebar_position: 2
---

# Installation & Configuration

Here you will find the instructions for setting up this project.

:::caution
***These section is not finalized & is likely to change.***
:::

## Setup

***...[TO DO]...***

## Required Variables

This package assumes that you have an existing DBT project with a BigQuery profile and a BigQuery GCP instance available with GA4 event data loaded. Source data is located using the following variables which must be set in your `dbt_project.yml` file.

```yaml
vars:
  project: '<gcp_project>'
  dataset: '<ga4_dataset>'
  start_date: 'YYYYMMDD'
  frequency: 'daily'
```

### Project

The GCP project where your GA4 data is located.

```yaml
vars: 
  project: '<gcp_project>'
```

### Dataset

The GCP dataset where your GA4 data is located.

```yaml
vars: 
  dataset: '<ga4_dataset>'
```

### Start Date

The date to start pulling data from.

```yaml
vars: 
  start_date: 'YYYYMMDD'
```

### Frequency

Set the frequency of the data export. This should match the frequency of the export configured in GA4.

**Options:**

- `daily`: Daily export.
- `streaming`: Streaming export.
- `daily+streaming`: Appends today's intraday data to daily data.

```yaml
vars: 
  frequency: 'daily'
```

:::tip
**If you don't have any GA4 data of your own, you can connect to Google's public data set with the following settings:**
:::

```yaml
vars:
  project: 'bigquery-public-data'
  dataset: 'ga4_obfuscated_sample_ecommerce'
  start_date: '20210120' # Only using data from 2021-01-20 for testing purposes.
```

***Find more info about the GA4 obfuscated dataset [here](https://developers.google.com/analytics/bigquery/web-ecommerce-demo-dataset).***

## Optional Variables

:::caution
***These variables are also NOT finalized & are LIKELY to change.***
:::

```yaml
vars:
  conversion_events: ['download_gated', 'download_ungated', 'form_submit', 'search', 'social_click']
  consideration_events: ['click', 'cta_click', 'navigation_click', 'view_search_results']
  excluded__events: ['session_start']
  excluded__event_params: ['ga_session_id', 'page_location', 'ga_session_number', 'session_engaged']
  excluded__columns: ['event_previous_timestamp', 'event_bundle_sequence_id', 'event_server_timestamp_offset']
  excluded__user_props: []
  included__query_params: ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid']
  funnel_stages: ['begin_checkout', 'add_shipping_info', 'add_payment_info', 'purchase']
```

### Query Parameter Exclusions

Setting any `query_parameter_exclusions` will remove query string parameters from the `page_location` field for all downstream processing. Original parameters are captured in a new `original_page_location` field. Ex:

```yaml
vars: 
  query_parameter_exclusions: ['gclid', 'fbclid', '_ga'] 
```

### Conversion Events

Specific events can be set as conversions with the `conversion_events` variable in your `dbt_project.yml` file. These events will be counted against each session and included in the final mart models. Ex:

```yaml
vars:
  conversion_events: ['purchase', 'download']
```

### Consideration Events

Specific events can be set as considerations with the `conversion_events` variable in your `dbt_project.yml` file. These events will be counted against each session and included in the final mart models. Ex:

```yaml
vars:
  consideration_events: ['cta_click', 'view_search_results']
```

### Funnel Stages

Set specific events to be stages in a funnel.

```yaml
vars:
  funnel_stages: ['begin_checkout', 'add_shipping_info', 'add_payment_info', 'purchase']
```

### Excluded Events

Exclude specific events from the final tables.

```yaml
vars:
  excluded__events: ['session_start']
```

### Excluded Event parameters

Exclude specific event parameters from the final tables.

```yaml
vars:
  excluded__event_params: ['ga_session_id', 'page_location', 'ga_session_number', 'session_engaged', 'engagement_time_msec', 'entrances', 'page_title', 'page_referrer', 'source', 'medium', 'campaign', 'debug_mode', 'term', 'clean_event', 'value', 'tax', 'coupon', 'promotion_name', 'transaction_id']
```

### Excluded Columns

Exclude specific default columns from the final tables.

```yaml
vars:
  excluded__columns: ['event_previous_timestamp', 'event_bundle_sequence_id', 'event_server_timestamp_offset', 'user_id', 'user_pseudo_id', 'stream_id', 'ga_session_id', 'privacy_info', 'event_dimensions', 'app_info']
```

### Excluded User Properties

Exclude specific user properties from the final tables.

```yaml
vars:
  excluded__user_props: ['logged_in']
```

### Included Query Parameters

Include specific query parameters to be in the final tables.

```yaml
vars:
  included__query_params: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'gclsrc', '_ga']
```
