alter table public.mavi_kadraj_messages
  add column if not exists is_editorial boolean not null default false,
  add column if not exists editorial_icon text;

alter table public.mavi_kadraj_messages
  drop constraint if exists mavi_kadraj_messages_editorial_icon_check;

alter table public.mavi_kadraj_messages
  add constraint mavi_kadraj_messages_editorial_icon_check check (
    (is_editorial and editorial_icon in ('🕊️', '✨', '📸', '🍂', '🌿'))
    or (not is_editorial and editorial_icon is null)
  );

drop policy if exists "Anonymous visitors submit pending Mavi Kadraj messages"
  on public.mavi_kadraj_messages;

create policy "Anonymous visitors submit pending Mavi Kadraj messages"
on public.mavi_kadraj_messages for insert to anon
with check (
  status = 'pending'
  and approved_at is null
  and is_featured = false
  and is_editorial = false
  and editorial_icon is null
);

insert into public.mavi_kadraj_messages
  (id, name, message, status, approved_at, is_featured, is_editorial, editorial_icon)
values
  (
    '35e150d6-9048-43ad-9448-000000000001',
    'Mavi Kadraj',
    'Bazen en güzel kare, insanın birkaç saniye daha baktığı yerde saklıdır.',
    'approved', now(), false, true, '🕊️'
  ),
  (
    '35e150d6-9048-43ad-9448-000000000002',
    'Mustafa Öner',
    'Bu sayfa fotoğraflara bakıp geçenler için değil; bir karede biraz kalanlar için.',
    'approved', now(), false, true, '📸'
  ),
  (
    '35e150d6-9048-43ad-9448-000000000003',
    'Mavi Kadraj',
    'Bazı fotoğrafların hikâyesini ben anlattım. Bundan sonrakilerde sizin cümleleriniz de kalsın.',
    'approved', now(), false, true, '✨'
  ),
  (
    '35e150d6-9048-43ad-9448-000000000004',
    'Mustafa Öner',
    'Bir fotoğraf sizde bir şey bıraktıysa, burada siz de küçük bir iz bırakabilirsiniz.',
    'approved', now(), false, true, '🌿'
  ),
  (
    '35e150d6-9048-43ad-9448-000000000005',
    'MK Digital Systems',
    'Mavi Kadraj’ın yeni yolculuğuna küçük bir iz de biz bırakalım. Güzel fotoğraflar, güzel cümlelerle çoğalsın.',
    'approved', now(), false, true, '🍂'
  )
on conflict (id) do update set
  name = excluded.name,
  message = excluded.message,
  status = 'approved',
  is_editorial = true,
  editorial_icon = excluded.editorial_icon;

