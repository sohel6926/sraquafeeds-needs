import pg from 'pg';
import { PRODUCTS_DATA } from '../src/data/products.ts';
import { GALLERY_DATA } from '../src/data/gallery.ts';
import {
  DEFAULT_LEADS,
  DEFAULT_FARMER_STORIES,
  DEFAULT_FAQS,
  DEFAULT_SITE_SETTINGS,
} from '../src/context/DataContext.tsx';

const { Client } = pg;

const projectId = 'lnsflmqbrpdkjcajzagw';
const dbPw = 'Codtech@1208';
const host = 'aws-0-ap-southeast-1.pooler.supabase.com';

async function seed() {
  const client = new Client({
    host,
    port: 5432,
    database: 'postgres',
    user: `postgres.${projectId}`,
    password: dbPw,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    await client.connect();
    console.log('Connected to DB for seeding...');

    // 1. Seed Site Settings
    console.log('Seeding site_settings...');
    const s = DEFAULT_SITE_SETTINGS;
    await client.query(
      `
      INSERT INTO public.site_settings (
        id, business_name, tagline, proprietor, primary_phone, secondary_phone,
        whatsapp_number, primary_email, secondary_email, gstin, address, shop_hours,
        covered_radius, announcement_enabled, announcement_text, hero_headline,
        hero_subheadline, hero_title, hero_subtitle, hero_badge1, hero_badge2, hero_badge3,
        hero_stat1_number, hero_stat1_label, hero_stat2_number, hero_stat2_label,
        hero_stat3_number, hero_stat3_label, hero_stat4_number, hero_stat4_label,
        about_founder_message, about_story_part1, about_story_part2, about_mission,
        dispatch_turnaround, payment_notice, updated_at
      ) VALUES (
        'default', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28,
        $29, $30, $31, $32, $33, $34, $35, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        business_name = EXCLUDED.business_name,
        tagline = EXCLUDED.tagline,
        proprietor = EXCLUDED.proprietor,
        primary_phone = EXCLUDED.primary_phone,
        secondary_phone = EXCLUDED.secondary_phone,
        whatsapp_number = EXCLUDED.whatsapp_number,
        primary_email = EXCLUDED.primary_email,
        secondary_email = EXCLUDED.secondary_email,
        gstin = EXCLUDED.gstin,
        address = EXCLUDED.address,
        shop_hours = EXCLUDED.shop_hours,
        covered_radius = EXCLUDED.covered_radius,
        announcement_enabled = EXCLUDED.announcement_enabled,
        announcement_text = EXCLUDED.announcement_text,
        hero_headline = EXCLUDED.hero_headline,
        hero_subheadline = EXCLUDED.hero_subheadline,
        hero_badge1 = EXCLUDED.hero_badge1,
        hero_badge2 = EXCLUDED.hero_badge2,
        hero_badge3 = EXCLUDED.hero_badge3,
        hero_stat1_number = EXCLUDED.hero_stat1_number,
        hero_stat1_label = EXCLUDED.hero_stat1_label,
        hero_stat2_number = EXCLUDED.hero_stat2_number,
        hero_stat2_label = EXCLUDED.hero_stat2_label,
        hero_stat3_number = EXCLUDED.hero_stat3_number,
        hero_stat3_label = EXCLUDED.hero_stat3_label,
        hero_stat4_number = EXCLUDED.hero_stat4_number,
        hero_stat4_label = EXCLUDED.hero_stat4_label,
        about_founder_message = EXCLUDED.about_founder_message,
        about_story_part1 = EXCLUDED.about_story_part1,
        about_story_part2 = EXCLUDED.about_story_part2,
        about_mission = EXCLUDED.about_mission,
        dispatch_turnaround = EXCLUDED.dispatch_turnaround,
        payment_notice = EXCLUDED.payment_notice,
        updated_at = NOW();
    `,
      [
        s.businessName,
        s.tagline,
        s.proprietor,
        s.primaryPhone,
        s.secondaryPhone,
        s.whatsappNumber,
        s.primaryEmail,
        s.secondaryEmail,
        s.gstin,
        s.address,
        s.shopHours,
        s.coveredRadius,
        s.announcementEnabled,
        s.announcementText,
        s.heroHeadline,
        s.heroSubheadline,
        s.heroTitle || s.heroHeadline,
        s.heroSubtitle || s.heroSubheadline,
        s.heroBadge1,
        s.heroBadge2,
        s.heroBadge3,
        s.heroStat1Number,
        s.heroStat1Label,
        s.heroStat2Number,
        s.heroStat2Label,
        s.heroStat3Number,
        s.heroStat3Label,
        s.heroStat4Number,
        s.heroStat4Label,
        s.aboutFounderMessage,
        s.aboutStoryPart1,
        s.aboutStoryPart2,
        s.aboutMission,
        s.dispatchTurnaround,
        s.paymentNotice,
      ]
    );

    // 2. Seed Products
    console.log(`Seeding ${PRODUCTS_DATA.length} products...`);
    for (const p of PRODUCTS_DATA) {
      await client.query(
        `
        INSERT INTO public.products (
          id, name, category, tagline, description, packaging,
          key_benefits, image_url, is_popular, curiosity_highlight,
          curiosity_badge, full_description, composition, specs,
          dosage_schedule, ideal_water_params, handling_and_storage, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          packaging = EXCLUDED.packaging,
          key_benefits = EXCLUDED.key_benefits,
          image_url = EXCLUDED.image_url,
          is_popular = EXCLUDED.is_popular,
          curiosity_highlight = EXCLUDED.curiosity_highlight,
          curiosity_badge = EXCLUDED.curiosity_badge,
          full_description = EXCLUDED.full_description,
          composition = EXCLUDED.composition,
          specs = EXCLUDED.specs,
          dosage_schedule = EXCLUDED.dosage_schedule,
          ideal_water_params = EXCLUDED.ideal_water_params,
          handling_and_storage = EXCLUDED.handling_and_storage,
          updated_at = NOW();
      `,
        [
          p.id,
          p.name,
          p.category,
          p.tagline || '',
          p.description || '',
          p.packaging || '',
          JSON.stringify(p.keyBenefits || []),
          p.imageUrl || '',
          p.isPopular ?? false,
          p.curiosityHighlight || '',
          p.curiosityBadge || '',
          p.fullDescription || '',
          JSON.stringify(p.composition || []),
          JSON.stringify(p.specs || []),
          JSON.stringify(p.dosageSchedule || []),
          JSON.stringify(p.idealWaterParams || []),
          p.handlingAndStorage || '',
        ]
      );
    }

    // 3. Seed Gallery
    console.log(`Seeding ${GALLERY_DATA.length} gallery items...`);
    for (const g of GALLERY_DATA) {
      await client.query(
        `
        INSERT INTO public.gallery (
          id, title, category, description, image_url, updated_at
        ) VALUES ($1, $2, $3, $4, $5, NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url,
          updated_at = NOW();
      `,
        [g.id, g.title, g.category, g.description, g.imageUrl]
      );
    }

    // 4. Seed Leads
    console.log(`Seeding ${DEFAULT_LEADS.length} leads...`);
    for (const l of DEFAULT_LEADS) {
      await client.query(
        `
        INSERT INTO public.leads (
          id, farmer_name, phone, village, topic, product_name,
          category, amount_or_acres, lead_type, farmer_profile,
          message, status, notes, source, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW()
        )
        ON CONFLICT (id) DO NOTHING;
      `,
        [
          l.id,
          l.farmerName,
          l.phone,
          l.village || '',
          l.topic || '',
          l.productName || '',
          l.category || '',
          l.amountOrAcres || '',
          l.leadType || 'whatsapp',
          l.farmerProfile || '',
          l.message || '',
          l.status || 'new',
          l.notes || '',
          l.source || 'Website Contact Form',
          l.createdAt || new Date().toISOString(),
        ]
      );
    }

    // 5. Seed Farmer Stories
    console.log(`Seeding ${DEFAULT_FARMER_STORIES.length} farmer stories...`);
    for (const st of DEFAULT_FARMER_STORIES) {
      await client.query(
        `
        INSERT INTO public.farmer_stories (
          id, name, village, region, culture_type, farm_size,
          doc_days, stars, highlight_category, quote, key_outcomes,
          verified_crop_count, date, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          village = EXCLUDED.village,
          region = EXCLUDED.region,
          culture_type = EXCLUDED.culture_type,
          farm_size = EXCLUDED.farm_size,
          doc_days = EXCLUDED.doc_days,
          stars = EXCLUDED.stars,
          highlight_category = EXCLUDED.highlight_category,
          quote = EXCLUDED.quote,
          key_outcomes = EXCLUDED.key_outcomes,
          verified_crop_count = EXCLUDED.verified_crop_count,
          date = EXCLUDED.date,
          updated_at = NOW();
      `,
        [
          st.id,
          st.name,
          st.village,
          st.region,
          st.cultureType,
          st.farmSize,
          st.docDays,
          st.stars || 5,
          st.highlightCategory,
          st.quote,
          JSON.stringify(st.keyOutcomes || []),
          st.verifiedCropCount,
          st.date,
        ]
      );
    }

    // 6. Seed FAQs
    console.log(`Seeding ${DEFAULT_FAQS.length} FAQs...`);
    for (let i = 0; i < DEFAULT_FAQS.length; i++) {
      const f = DEFAULT_FAQS[i];
      await client.query(
        `
        INSERT INTO public.faqs (
          id, category, question, answer, key_points,
          recommended_action, sort_order, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT (id) DO UPDATE SET
          category = EXCLUDED.category,
          question = EXCLUDED.question,
          answer = EXCLUDED.answer,
          key_points = EXCLUDED.key_points,
          recommended_action = EXCLUDED.recommended_action,
          sort_order = EXCLUDED.sort_order,
          updated_at = NOW();
      `,
        [
          f.id,
          f.category,
          f.question,
          f.answer,
          JSON.stringify(f.keyPoints || []),
          f.recommendedAction ? JSON.stringify(f.recommendedAction) : null,
          i,
        ]
      );
    }

    console.log('Seed completed successfully for all tables!');
    await client.end();
  } catch (err) {
    console.error('Seeding error:', err);
    try {
      await client.end();
    } catch (e) {}
    process.exit(1);
  }
}

seed();
