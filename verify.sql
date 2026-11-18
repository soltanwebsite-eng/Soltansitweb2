-- Read-only verification for the existing SULTAN Supabase project.
-- Run in Supabase SQL Editor. This file intentionally does not drop or recreate tables/policies.

-- 1) Expected public tables and RLS state
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname='public'
  and tablename in ('products','repairs','repair_status_history','store_orders','store_order_items')
order by tablename;

-- 2) Public repair tracking must be RPC-only: no anon SELECT policy on repairs.
select policyname, cmd, roles
from pg_policies
where schemaname='public' and tablename='repairs'
order by policyname;

-- 3) Required RPC signatures
select p.proname, pg_get_function_arguments(p.oid) as arguments
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and p.proname in ('track_repair','place_store_order','update_repair_admin')
order by p.proname;

-- 4) Required storage buckets
select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id in ('repair-intake','product-images')
order by id;
