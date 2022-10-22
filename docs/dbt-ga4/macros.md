---
sidebar_position: 4
---

# Macros

These are the macros used to help with the GA4 data modeling.

:::caution
***These macros are also not finalized & are likely to change.***
:::

## get_first(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/get_positions.sql)*)

This macro returns the `FIRST` position of a specified `from_column_name`, which is partioned by the `by_column_name`.

**Args:**

- `by_column_name` (***required***): The name of the column which you want to partition your selction by.
- `from_column_name` (***required***): The name of the column to get the first value of.

**Usage:**

```sql
{{ get_first('<by_column_name>', '<from_column_name>') }}
```

**Example:** Get the landing_page of a corresponding Session by selecting the first `page_path` using that Session's `session_key`.

```sql
SELECT
  {{ get_first('session_key', 'page_path') }} AS landing_page
  ...
```

## get_last(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/get_positions.sql)*)

This macro returns the `LAST` position of a specified `from_column_name`, which is partioned by the `by_column_name`.

**Args:**

- `by_column_name` (***required***): The name of the column which you want to partition your selction by.
- `from_column_name` (***required***): The name of the column to get the last value of.

**Usage:**

```sql
{{ get_last('<by_column_name>', '<from_column_name>') }}
```

**Example:** Get the last `event_key` for a corresponding Session using that Session's `session_key`.

```sql
SELECT
  {{ get_last('session_key', 'event_key') }} AS last_session_event_key,
  ...
```

## extract_hostname_from_url(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/parse_url.sql)*)

This macro extracts the `hostname` from a column containing a `url`.

**Args:**

- `url` (***required***): The column containting URLs.

**Usage:**

```sql
{{ extract_hostname_from_url('<url>') }}
```

**Example:** Extract the `hostname` from the `page_location` column.

```sql
SELECT
  {{ extract_hostname_from_url('page_location') }} AS page_hostname,
  ...
```

## extract_query_string_from_url(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/parse_url.sql)*)

This macro extracts the `query_string` from a column containing a `url`.

**Args:**

- `url` (***required***): The column containting URLs.

**Usage:**

```sql
{{ extract_query_string_from_url('<url>') }}
```

**Example:** Extract the `query_string` from the `page_location` column.

```sql
SELECT
  {{ extract_query_string_from_url('page_location') }} AS page_query_string,
  ...
```

## remove_query_parameters(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/parse_url.sql)*)

This macro removes the specified `parameters` from a column containing a `url`.

**Args:**

- `url` (***required***): The column containting URLs.
- `parameters` (***required***, *default*=`[]`): A list of query parameters to remove from the URL.

**Usage:**

```sql
{{ remove_query_parameters('<url>', '[parameters]')  }}
```

**Example:** Remove the parameters: `gclid`, `fbclid`, and `_ga` from the `page_location` column.

```sql
{% set parameters = ['gclid','fbclid','_ga'] %}

SELECT
  {{ remove_query_parameters('page_location', parameters) }} AS clean_page_location,
  ...
```

## unnest_by_key(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/unnest_by_keys.sql)*)

This macro unnests a single key's value from an array. This macro will dynamically alias the sub-query with the name of the `column_to_unnest`.

**Args:**

- `column_to_unnest` (***required***): The array column to unnest the key's value from.
- `key_to_extract` (***required***): The key by which to get the corresponding value for.
- `value_type` (*optional*, *default*=`"string"`): The data type of the key's value column.

**Usage:**

```sql
{{ unnest_by_key('<column_to_unnest>', '<key_to_extract>', '<value_type>') }}
```

**Example:** Unnest the corresponding values for the keys: `page_location` and `ga_session_number` from the nested `event_params` column.

```sql
SELECT
  -- Unnest the default STRING value type
  {{ unnest_by_key('event_params', 'page_location') }},
  -- Unnest the INT value type
  {{ unnest_by_key('event_params', 'ga_session_number',  'int') }},
  ...
```

## unnest_by_key_alt(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/unnest_by_keys.sql)*)

This macro unnests a single key's value from an array. This macro allows for a custom alias named sub-query.

**Args:**

- `column_to_unnest` (***required***): The array column to unnest the key's value from.
- `key_to_extract` (***required***): The key by which to get the corresponding value for.
- `value_type` (*optional*, *default*=`"string"`): The data type of the key's value column.

**Usage:**

```sql
{{ unnest_by_key_alt('<column_to_unnest>', '<key_to_extract>', '<value_type>') }} AS <custom_alias_name>,
```

**Example:** Unnest the corresponding values for the keys: `page_location` and `ga_session_number` from the nested `event_params` column.

```sql
SELECT
  -- Unnest the default STRING value type & use a custom alias
  {{ unnest_by_key_alt('event_params', 'page_location') }} AS url, 
  -- Unnest the INT value type & use a custom alias
  {{ unnest_by_key_alt('event_params', 'ga_session_number',  'int') }} AS session_number,
  ...
```

## get_event_params(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/unnest_by_keys.sql)*)

This macro will dynamically return all of the `keys` and their corresponding `value_types` found in the `event_params` array column.

:::note
This macro will exclude `event_params` added to the `excluded_event_params` variable, which is specified in the `dbt_project.yml` file.
:::

**Usage / Example:**

```sql
SELECT
  {% for event_param in get_event_params() -%}

  {{ unnest_by_key('event_params', event_param['event_param_key'], event_param['event_param_value']) }}
    
  {{- "," if not loop.last }}
  {% endfor %}
  ...
```

## default_channel_grouping(*[source](https://github.com/modataconsulting/dbt_ga4_project/blob/main/macros/default_channel_groupings.sql)*)

This macro determines the `default_channel_grouping` and will result in one the following classifications:

- `Direct`
- `Paid Social`
- `Oraginc Social`
- `Email`
- `Affiliates`
- `Paid Shopping`
- `Paid Search`
- `Display`
- `Other Advertising`
- `Organic Search`
- `Organic Video`
- `Organic Shopping`
- `Audio`
- `SMS`
- `(Other)`

**Args:**

- `source` (***required***): The source column used in determining the default channel grouping.
- `medium` (***required***): The medium column used in determining the default channel grouping.
- `source_category` (***required***): The source category column used in determining the default channel grouping. These are desiganted in the `ga4_source_categories.csv` seed file.

**Usage:**

```sql
{{ default_channel_grouping('<source>', '<medium>', '<source_category>') }}
```

**Example:**

```sql
SELECT
  {{ default_channel_grouping('source', 'medium', 'source_category') }} AS default_channel_grouping,
  ...
```
