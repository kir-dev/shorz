export const l = (key: keyof typeof languageData) => {
  return languageData[key];
};

const languageData = {
  'title.loading': 'Betöltés',
  'title.error': 'Hiba',
  'title.notFound': 'Milyen oldal?',
  'title.unknown': 'Ismeretlen',
  'title.links': 'Linkek',
  'title.createLink': 'Link létrehozása',
  'title.editLink': 'Link szerkesztése',
  'title.login': 'Bejelentkezés',
  'title.dashboard': 'Dashboard',
  'error.wrongCredentials': 'Hibás bejelentkezési adatok',
  'error.unauthorized': 'Nem vagy bejelentkezve',
  'error.forbidden': 'Nincs jogosultságod',
  'error.general': 'Ismeretlen hiba történt',
  'error.notFound': 'Nem található',
  'error.create': 'Létrehozás sikertelen',
  'error.save': 'Mentés sikertelen',
  'success.save': 'Sikeres mentés',
  'button.add': 'Hozzáadás',
  'button.delete': 'Törlés',
  'button.edit': 'Szerkesztés',
  'button.save': 'Mentés',
  'button.create': 'Létrehozás',
  'button.cancel': 'Mégse',
  'button.reset': 'Módosítások elvetése',
  'button.continue': 'Tovább',
  'header.confirmDelete': 'Biztosan törlöd?',
  'text.emptyList': 'Itt nincs semmi. Egyelőre. Hozz létre valami újat!',
  'form.validation.required': 'Nem lenne szép üresen hagyni!',
  'form.validation.url': 'URL-t kellene írni!',
  'form.link.label.name': 'Név',
  'form.link.label.url': 'Rövidítendő URL',
  'form.validation.email': 'Ellenőrizd az e-mail címet!',
  'navbar.section.user': 'Felhasználó',
  'navbar.section.things': 'Dolgaim',
  'navbar.unknown': 'Ismeretlen',
  'navbar.logout': 'Kijelentkezés',
  'page.error.heading': 'Erre a hibára fel is készültünk, meg nem is.',
  'page.error.text': 'Ha ezt elküldöd nekünk, nem történik meg később.',
  'page.notFound.heading': 'Egy jéghideg mit kérsz?',
  'page.notFound.text': 'Ilyen oldal nem létezik, vagy nincs jogosultságod hozzá.',
  'page.notFound.actionLabel': 'Amúgy mi az a Shorz?',
  'page.login.text':
    'Jelentkezz be AuthSch fiókoddal! A profilod automatikusan létrejön az első bejelentkezés alkalmával.',
  'page.login.button': 'Bejelentkezés AuthSch-val',
  'page.login.back': 'Vissza a főoldalra',
  'page.linkDetails.copySuccess': 'Másolva!',
  'page.linkDetails.copyFail': 'Sikertelen másolás!',
  'page.linkDetails.fullUrl': 'Teljes URL',
  'page.linkDetails.shortenedUrl': 'Rövidített URL',
  'page.dashboard.tileHelpText': 'Átirányítás',
  'page.landing.button': 'Vágjunk bele!',
  'page.landing.title': 'Link rövidítés egyszerűen',
  'page.landing.paragraph.1':
    'Készíts rövid linkeket pillanatok alatt,' +
    'amelyeket bármikor megváltoztathatsz később!' +
    'Nincsenek többé pazarlások, újranyomtatások és lejárt linkek - készítsd el egyszer' +
    'és használd azt az egy linket!',
  'page.landing.paragraph.2':
    'A link a te irányításod alatt áll: szerkeszd és kövesd nyomon a' +
    'linket látogatók számát napokra bontva - ' +
    'így tarthatod kézben kampányaidat!',
  'page.landing.paragraph.3':
    'Mire van szükségem ehhez? Más dinamikus link szolgáltatások már a szerkesztésért díjat számítanak fel. ' +
    'A Shorz használatához csupán egy AuthSch fiókra van szükséged!',
};
