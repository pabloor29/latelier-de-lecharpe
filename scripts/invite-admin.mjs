#!/usr/bin/env node
/**
 * Invite un utilisateur pour UN site precis (multi-site, projet Supabase partage).
 * Le schema cible est passe dans user_metadata.site -> le trigger public.handle_new_user
 * cree la ligne uniquement dans [site].profiles.
 *
 * Prerequis (env) :
 *   SUPABASE_URL               = https://<ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  = cle service_role (SECRETE, jamais cote client)
 *
 * Usage :
 *   node scripts/invite-admin.mjs <email> <site_schema> <redirect_base_url>
 * Exemple :
 *   node scripts/invite-admin.mjs jean@x.com latelier_de_lecharpe https://www.latelierdelecharpe.fr
 */
import { createClient } from '@supabase/supabase-js'

const [, , email, site, redirectBase] = process.argv

if (!email || !site || !redirectBase) {
  console.error('Usage: node scripts/invite-admin.mjs <email> <site_schema> <redirect_base_url>')
  process.exit(1)
}

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Manque SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY dans l\'env.')
  process.exit(1)
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
  data: { site },                                   // -> raw_user_meta_data.site
  redirectTo: `${redirectBase}/auth/confirm`        // GoTrue redirige ici apres verif
})

if (error) {
  console.error('Echec invitation:', error.message)
  process.exit(1)
}
console.log(`Invitation envoyee a ${email} pour le site "${site}". user id: ${data.user?.id}`)
