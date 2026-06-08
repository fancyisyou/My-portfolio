## قاعدة مهمة
- أي تغيير في النص العربي لازم يتطبق على الإنجليزي في نفس ملف `src/lib/translations.js`
- Any change to Arabic text must also update the English equivalent in `src/lib/translations.js`

## التغييرات المنجزة

### Experience & Skills
- **Experience.js**: 8 خبرات فري لانس حقيقية (مصمم جرافيك، مخرج إبداعي، مدير استشاري، مصور فوتوغرافي، مصمم مواقع، أخصائي مبيعات CRM & LMS، أخصائي علاقات عامة، مرشد قوقل محلي)
- **translations.js**: تم تحديث EN/AR بالكامل للأقسام والخبرات والمهارات
- **Skills.js**: 12 مهارة محدّثة لتتماشى مع الخبرات (تصميم جرافيك، تصميم مواقع، إخراج إبداعي، استشارات، تصوير، CRM & LMS، علاقات عامة، مرشد قوقل، Figma، Adobe Creative Suite، استراتيجية محتوى، هوية علامة تجارية)

### UI Components
- **Projects.js**: مكتبة أعمال سلسة — 8 بطاقات في Grid (3 أعمدة)، شيل الفلتر والكاروسيل، صور Unsplash، hover animation
- **Skills.js**: Skill tags بنفس تصميم زر "Get in touch" (شفاف، ذهبي، hover مملوء)
- **Nav**: زجاجي بدون `backdrop-blur`، shrink `duration-1000`، return `duration-500`
- **Hero.js**: 3D tilt، bordure ذهبي متحرك conic-gradient
- **CanvasParticles**: خلفية `fixed` عامة للموقع

### Translations Fixes
- `projectsTitle`: AR "مكتبة الأعمال" / EN "Project Library"
- `filterPhotography`: AR "تصوير" (بدون "احترافي")
- Footer year: 0202 -> 2026

### RTL & CSS
- `font-mono` يتحول لـ Cairo في الوضع العربي
- Section labels, filter buttons، وكل العناصر الشفافة لها bordure `#C7AC60`
- `@property --angle` + `conic-gradient` للبوردهيرو

### Notas
- مسار `/gaming` ما انمسك ولا تغير
- `text-sizes.md` يوثق كل أحجام الخطوط حسب القسم
- استخدم `gap-x-6` دايمًا في الـ Nav عشان لا يصير spacing jumps
