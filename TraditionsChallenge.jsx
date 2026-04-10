import { useState, useEffect, useRef, useCallback } from 'react';

// ─── LANGUAGE STRINGS ────────────────────────────────────────────────────────
const LANG = {
  en: {
    appTitle: 'Youth for Jesus', appSubtitle: 'Traditions Challenge',
    startChallenge: 'Start Challenge', groupPlay: 'Group Play',
    soloPractice: 'Solo Practice', leaderboard: 'Leaderboard', progress: 'Progress',
    bibleVerse: '"for the Spirit searcheth all things, yea, the deep things of God"',
    bibleRef: '— 1 Cor 2:10b', selectSection: 'Select a Section',
    selectMode: 'Select a Mode', locked: 'Locked',
    completePrevious: 'Complete previous section first',
    scenarios: 'Scenarios', trueOrFalse: 'True or False', fillTheGap: 'Fill the Gap',
    scenariosDesc: 'Real-life situations', trueOrFalseDesc: 'Quick fire decisions',
    fillTheGapDesc: 'Complete the tradition', questions: 'questions',
    bestScore: 'Best', completed: 'Completed', back: 'Back',
    streak: 'Streak', score: 'Score', correct: 'Correct!', notQuite: 'Not quite.',
    timesUp: "Time's up!", why: 'Why?', next: 'Next', finish: 'Finish',
    base: 'base', speed: 'speed', streakLabel: 'streak',
    perfect: 'Perfect Round!', great: 'Great Job!', good: 'Good Effort!', keep: 'Keep Learning!',
    bestStreakLabel: 'Best Streak', answered: 'Answered',
    enterName: 'Enter your name for the leaderboard', submitScore: 'Submit Score',
    tryAgain: 'Try Again', home: 'Home', noScores: 'No scores yet. Be the first!',
    easy: 'Easy', medium: 'Medium', hard: 'Hard', true: 'True', false: 'False',
    sectionA: 'Relationships', sectionB: 'Other Traditions Under Relationships',
    sectionC: 'Fellowship', sectionD: 'Projects', sectionE: 'Business',
    nameRequired: 'Please enter your name', codeRequired: 'Please enter a game code',
    gameNotFound: 'Game not found. Check the code.', scoreSubmitted: 'Score submitted! 🎉',
    hostGame: 'Host a Game', joinGame: 'Join a Game', createGame: 'Create Game',
    waitingForPlayers: 'Waiting for players to join...', startGame: 'Start Game',
    players: 'Players', copyCode: 'Copy Code', codeCopied: 'Copied!',
    joinLobby: 'Join Lobby', waitingForHost: 'Waiting for host to start...',
    yourCode: 'Your Game Code', enterCode: 'Enter Game Code', yourName: 'Your Name',
    selectSectionFirst: 'Select a section', modesComplete: 'modes complete',
    questionOf: 'of', modesBadge: ['Scenarios', 'True/False', 'Fill the Gap'],
  },
  sn: {
    appTitle: 'Vechidiki vaJesu', appSubtitle: 'Mutambo weMasikirwo',
    startChallenge: 'Tanga Mutambo', groupPlay: 'Tamba Neboka',
    soloPractice: 'Dzidzira Wega', leaderboard: 'Tafura yeKuranga', progress: 'Kufambira Mberi',
    bibleVerse: '"nokuti Mweya unoongorora zvinhu zvose, naizvozvo nenzizi dzaMwari"',
    bibleRef: '— 1 VaKorinto 2:10b', selectSection: 'Sarudza Chikamu',
    selectMode: 'Sarudza Nzira', locked: 'Rakavharwa',
    completePrevious: 'Pedzisa chikamu chapfuura kutanga',
    scenarios: 'Mamiriro', trueOrFalse: 'Chokwadi kana Nhema', fillTheGap: 'Zadza Nzvimbo',
    scenariosDesc: 'Mamiriro ehupenyu', trueOrFalseDesc: 'Mibvunzo inokurumidza',
    fillTheGapDesc: 'Pedzisa sikirwo', questions: 'mibvunzo',
    bestScore: 'Yakanyanya', completed: 'Yapedzerwa', back: 'Dzokera',
    streak: 'Mutsara', score: 'Mapoinzi', correct: 'Ndizvo!', notQuite: 'Kwete.',
    timesUp: 'Nguva Yapera!', why: 'Nei?', next: 'Inotevera', finish: 'Pedzisa',
    base: 'hwaro', speed: 'kumhanya', streakLabel: 'mutsara',
    perfect: 'Yakaringana Zvizere!', great: 'Basa Rakanaka!', good: 'Pamhino!', keep: 'Ramba Uchidzidza!',
    bestStreakLabel: 'Mutsara Wakanakisa', answered: 'Zvakabvunzwa',
    enterName: 'Pinda zita rako retafura', submitScore: 'Tumira Mapoinzi',
    tryAgain: 'Edza Zvakare', home: 'Kumba', noScores: 'Hapana mapoinzi. Ita wekutanga!',
    easy: 'Nyore', medium: 'Nepakati', hard: 'Yakaoma', true: 'Chokwadi', false: 'Nhema',
    sectionA: 'Hukama', sectionB: 'Mimwe Masikirwo eHukama',
    sectionC: 'Kusangana', sectionD: 'Mapurojekiti', sectionE: 'Bhizinesi',
    nameRequired: 'Pindai zita renyu', codeRequired: 'Pindai kodi yemutambo',
    gameNotFound: 'Mutambo hauwanike. Tarisa kodi.', scoreSubmitted: 'Mapoinzi atumirwa! 🎉',
    hostGame: 'Tanga Mutambo', joinGame: 'Pinda Mutambo', createGame: 'Gadzira Mutambo',
    waitingForPlayers: 'Mirira vatambi...', startGame: 'Tanga Mutambo',
    players: 'Vatambi', copyCode: 'Kopa Kodi', codeCopied: 'Yakopirwa!',
    joinLobby: 'Pinda Lobby', waitingForHost: 'Mirira muridzi kutanga...',
    yourCode: 'Kodi yeMutambo Wako', enterCode: 'Pinda Kodi yeMutambo', yourName: 'Zita Rako',
    selectSectionFirst: 'Sarudza chikamu', modesComplete: 'nzira dzapedzerwa',
    questionOf: 'ye', modesBadge: ['Mamiriro', 'Chokwadi/Nhema', 'Zadza Nzvimbo'],
  },
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'A', icon: '💑' }, { id: 'B', icon: '📋' }, { id: 'C', icon: '🤝' },
  { id: 'D', icon: '🚀' }, { id: 'E', icon: '💼' },
];

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const QUESTIONS = {
  A: {
    scenarios: [
      { id:'A-S1', difficulty:'easy', en:{ q:'You were in a relationship before you were baptized. What should you do first?', options:['A. Continue quietly without telling anyone','B. Immediately inform the Youth Pastor or Youth Advisors','C. Break up without seeking guidance','D. Wait until one year in the faith'], answer:1, explanation:'Tradition 1: You must immediately make it known to the Youth Pastor or Youth Advisors if you were in a relationship at baptism.' }, sn:{ q:'Waiva muhukama asati abapatidzwa. Chii chinofanira kuitwa kutanga?', options:['A. Ramba muhukama usingauraye munhu','B. Zivisa Mufundisi weVechidiki kana Vabatsiri pakarepo','C. Paradzana usina kutsvaga rubatsiro','D. Mirira gore rimwe muhutendi'], answer:1, explanation:'Sikirwo 1: Unofanira kuzivisa Mufundisi kana Vabatsiri pakarepo.' } },
      { id:'A-S2', difficulty:'medium', en:{ q:'A 22-year-old JRM boy wants to start a relationship. What must he do?', options:['A. Proceed freely — he is over 18','B. Get a go-ahead from the Youth Pastor or Youth Advisors','C. Wait until he is exactly 24','D. Only inform his parents'], answer:1, explanation:'Tradition 5: Boys below 24 are not allowed to enter a relationship without a go-ahead from the Youth Pastor or Youth Advisors.' }, sn:{ q:'Mukomana weJRM ane makore 22 anoda hukama. Chii chaanotaura?', options:['A. Enderera mberi — ane makore anopfuura 18','B. Wana mvumo yaMufundisi kana Vabatsiri','C. Mirira kusvika ane makore 24','D. Zivisa vabereki vake chete'], answer:1, explanation:'Sikirwo 5: Vakomana vane makore pasi pe24 vanoda mvumo.' } },
      { id:'A-S3', difficulty:'medium', en:{ q:'A brother approaches a sister directly with a relationship proposal without informing the Youth Advisors. What is this called?', options:['A. Normal procedure','B. Gross misconduct','C. A private matter','D. Acceptable if both are adults'], answer:1, explanation:'Tradition 8: Approaching a sister without knowledge of Youth Pastor or Youth Advisors is gross misconduct.' }, sn:{ q:'Mukoma anosvika kuhama sisi asina kuzivisa Vabatsiri. Izvi zvinonzi chii?', options:['A. Nzira yakajairika','B. Kusateerera kukuru','C. Nyaya yemumba','D. Zvinogamuchirwa'], answer:1, explanation:'Sikirwo 8: Kusvika kuhama sisi usina ruzivo rwaMufundisi kana Vabatsiri ndiyo kusateerera kukuru.' } },
      { id:'A-S4', difficulty:'hard', en:{ q:'A JRM member wants to start a relationship with a non-believer. Which is correct?', options:['A. Strictly forbidden with no exceptions','B. Allowed but the status must be known to the Youth Pastor and Advisors before establishing the relationship','C. Allowed only after 1 year in the faith','D. Allowed as long as the non-believer attends church once'], answer:1, explanation:'Tradition 6: No restriction, but the status must be known to Youth Pastor and Advisors before establishment. Non-believer must undergo pre-marriage counselling.' }, sn:{ q:'Nhengo yeJRM inoda hukama nemunhu asingatendi. Chii chakakodzera?', options:['A. Zvakavharirwa zvachose','B. Zvinobvumirwa asi zvinofanira kuzivikwa naMufundisi neVabatsiri husati hwatangwa','C. Zvinobvumirwa chete mushure megore rimwe','D. Zvinobvumirwa chero munhu aenda kereke kamwe'], answer:1, explanation:'Sikirwo 6: Hapana mipingamupinyi asi zvinofanira kuzivikwa naMufundisi neVabatsiri.' } },
      { id:'A-S5', difficulty:'hard', en:{ q:'Two JRM members broke up due to irreconcilable differences. What must they do before a new relationship?', options:['A. Start a new relationship immediately','B. Wait exactly 6 months','C. Wait for a prescribed time and make an appointment with Youth Advisors','D. Only get parents\' permission'], answer:2, explanation:'Tradition 3: They must wait for a prescribed time given to them and make an appointment with Youth Advisors or Youth Pastor.' }, sn:{ q:'Nhengo mbiri dzeJRM dzaparadzana. Chii chadzinofanira kuita?', options:['A. Dzinogona kupinda muhukama mutsva pakarepo','B. Mirira kwemasvondo matanhatu','C. Mirira nguva yakaiswa dokashanye neVabatsiri','D. Vanoda chete mvumo yevabereki'], answer:2, explanation:'Sikirwo 3: Vanofanira kumirira nguva yakaiswa vokashanye neVabatsiri.' } },
    ],
    truefalse: [
      { id:'A-TF1', difficulty:'easy', en:{ q:'JRM members must be at least Six Months old in the faith before considering a relationship.', answer:true, explanation:'Tradition 2: Six months in the faith is required before considering a relationship — symbolic of maturity in the Gospel.' }, sn:{ q:'Nhengo dzeJRM dzinofanira kunge dzagara mwedzi mitanhatu muhutendi dzisati dzafunga nezve hukama.', answer:true, explanation:'Sikirwo 2 rinoti mwedzi mitanhatu ndiyo nguva yepasi.' } },
      { id:'A-TF2', difficulty:'easy', en:{ q:'Boys below the age of 24 are not allowed to enter a relationship without a go-ahead from Youth Pastor or Youth Advisors.', answer:true, explanation:'Tradition 5 states this clearly.' }, sn:{ q:'Vakomana vane makore pasi pe24 havabvumirwi kupinda muhukama pasina mvumo.', answer:true, explanation:'Sikirwo 5 rinoratidzira izvi pachena.' } },
      { id:'A-TF3', difficulty:'medium', en:{ q:'Boys are never allowed to marry a girl who is 20 years and below under any circumstances whatsoever.', answer:false, explanation:'Tradition 4: Boys cannot marry a girl 20 and below UNLESS the Youth Pastor or Youth Advisors grant permission.' }, sn:{ q:'Vakomana havazombobvumirwi kuroora musikana ane makore 20 nemazasi munhu wose wose.', answer:false, explanation:'Sikirwo 4: Havabvumirwi KUNZE KWEKUNGE Mufundisi kana Vabatsiri vatipa mvumo.' } },
      { id:'A-TF4', difficulty:'medium', en:{ q:'All JRM relationships must follow purity and holiness and must never involve any sexual contact or indecency.', answer:true, explanation:'Tradition 7 states this directly.' }, sn:{ q:'Hukama hwose hweJRM hunofanira kutevera utsvene uye husasanganisa kubatana kwemuviri.', answer:true, explanation:'Sikirwo 7 rinoreva izvi pachena.' } },
      { id:'A-TF5', difficulty:'hard', en:{ q:'There are absolutely no restrictions at all for JRM members entering relationships with non-believers.', answer:false, explanation:'Tradition 6: While not outright banned, the status must be known to Youth Pastor and Advisors before establishing the relationship, and the non-believer must undergo pre-marriage counselling.' }, sn:{ q:'Hapana mipingamupinyi yose kune nhengo dzeJRM kupinda muhukama navesingatendi.', answer:false, explanation:'Sikirwo 6: Zvinofanira kuzivikwa naMufundisi neVabatsiri, uye munhu asingatendi anofanira kufundiswa.' } },
    ],
    fillin: [
      { id:'A-FG1', difficulty:'easy', en:{ q:'Members of JRM should be at least ___ months old in the faith before considering a relationship.', options:['Six','Three','Twelve','Two'], answer:0, explanation:'Tradition 2: Six months is the minimum, symbolic of maturity in the Gospel.' }, sn:{ q:'Nhengo dzeJRM dzinofanira kunge dzagara mwedzi ___ muhutendi dzisati dzafunga nezve hukama.', options:['Matanhatu','Matatu','Gumi neViri','Maviri'], answer:0, explanation:'Sikirwo 2: Mwedzi mitanhatu ndiyo nguva yepasi.' } },
      { id:'A-FG2', difficulty:'medium', en:{ q:'For a JRM relationship to continue, the boy must be at least ___ years older than the girl.', options:['3','5','2','1'], answer:0, explanation:'Tradition 15: The boy must be at least 3 years older.' }, sn:{ q:'Kuti hukama hurarame, mukomana anofanira kunge akura makore ___ kupfuura musikana.', options:['3','5','2','1'], answer:0, explanation:'Sikirwo 15: Makore matatu ndiyo pasi.' } },
      { id:'A-FG3', difficulty:'medium', en:{ q:'Approaching a sister without knowledge of the Youth Pastor or Youth Advisors is ___.', options:['Gross misconduct','A minor offence','Perfectly fine','Encouraged'], answer:0, explanation:'Tradition 8: This is clearly described as gross misconduct.' }, sn:{ q:'Kusvika kuhama sisi usina ruzivo rwaMufundisi kana Vabatsiri ___ ndiyo.', options:['Kusateerera kukuru','Mhosho diki','Zvakanaka','Zvinokurudzirwa'], answer:0, explanation:'Sikirwo 8: Izvi ndiyo kusateerera kukuru.' } },
      { id:'A-FG4', difficulty:'hard', en:{ q:'Boys below the age of ___ are not allowed to enter a relationship without permission from Youth Pastor or Youth Advisors.', options:['24','18','21','25'], answer:0, explanation:'Tradition 5: Boys below 24 need a go-ahead.' }, sn:{ q:'Vakomana vane makore pasi pe___ havabvumirwi kupinda muhukama pasina mvumo.', options:['24','18','21','25'], answer:0, explanation:'Sikirwo 5: Vakomana vane makore pasi pe24.' } },
    ],
  },
  B: {
    scenarios: [
      { id:'B-S1', difficulty:'easy', en:{ q:'A sister is approached by a brother with a relationship proposal. What should she do?', options:['A. Accept or reject privately','B. Confirm to Youth Advisors or Youth Pastor before making any decision','C. Immediately reject him','D. Ask friends first'], answer:1, explanation:'Section B (c): Any girl approached by a brother must confirm this to the Youth Advisors or Youth Pastor before making any decision.' }, sn:{ q:'Sisi anoudzwa nemukomana nezve hukama. Chii chinofanira kuitwa?', options:['A. Gamuchira kana ramba pasina kuzivisa munhu','B. Zivisa Vabatsiri kana Mufundisi asati atora chisarudzo','C. Murambei pakarepo','D. Bvunza shamwari dzake'], answer:1, explanation:'Chikamu B (c): Musikana wose anofanira kuzivisa Vabatsiri kana Mufundisi asati atora chisarudzo.' } },
      { id:'B-S2', difficulty:'medium', en:{ q:'You know two JRM members secretly in a relationship who haven\'t told Youth Advisors. What must you do?', options:['A. Keep it secret — respect their privacy','B. Report to the Youth Pastor or Youth Advisors','C. Confront them privately','D. Post about it to warn others'], answer:1, explanation:'Section B: Being aware of secret relationships and failing to report is also misconduct. You must report it.' }, sn:{ q:'Unoziva nhengo mbiri dziri muhukama hwakavanzika dzisina kuzivisa Vabatsiri. Chii chinofanira kuitwa?', options:['A. Chengeta chakavanzika','B. Zivisa Mufundisi kana Vabatsiri','C. Vataurire ivo vega','D. Vhumura pachena'], answer:1, explanation:'Chikamu B: Kuziva usingaburitse ndiyo kusateerera.' } },
      { id:'B-S3', difficulty:'medium', en:{ q:'A sister approaches a brother first with a relationship proposal. What should the brother do?', options:['A. Accept if he likes her','B. Report such Babylonian misdeeds to Youth Pastor or Youth Advisors immediately','C. Discuss privately first','D. Ask Youth Advisors only if he wants to accept'], answer:1, explanation:'Section B (a): It is taboo for a sister to approach a brother. The brother must report such Babylonian misdeeds immediately.' }, sn:{ q:'Musikana anotanga kuuya kumukomana achida hukama. Mukomana anofanira kuitei?', options:['A. Gamuchira kana anomuda','B. Zivisa Mufundisi kana Vabatsiri nezve mabasa eBhabhironi aya pakarepo','C. Taura naye vega kutanga','D. Bvunza Vabatsiri chete kana achida kugamuchira'], answer:1, explanation:'Chikamu B (a): Zvinotsutswa kuti musikana asvike kumukomana. Mukomana anofanira kuzivisa pakarepo.' } },
      { id:'B-S4', difficulty:'hard', en:{ q:'A secret couple now want to come forward and formally introduce their relationship to Youth Advisors. Is this acceptable?', options:['A. Yes — fully accepted','B. No — introducing an existing secret relationship to Youth Advisors is equally misconduct','C. Yes, as long as they apologise','D. Depends on how long it lasted'], answer:1, explanation:'Section B (b): Approaching Youth Pastor/Advisors to formalise an existing covert relationship is equally misconduct — though corrections are noble.' }, sn:{ q:'Murume nemusikana vari muhukama hwakavanzika vanoda kuzivisa Vabatsiri nhasi. Izi ndiyo nzira yakakodzera here?', options:['A. Hongu, zvinogamuchirwa zvachose','B. Kwete, kusvika kuVabatsiri kuzivisa hukama hwakavanzika ndiyo kusateerera','C. Hongu chero vakakumbira ruregerero','D. Zvinoenderana nenguva'], answer:1, explanation:'Chikamu B (b): Kusvika kuVabatsiri kuzivisa hukama hwakavanzika ndiyo kusateerera.' } },
      { id:'B-S5', difficulty:'hard', en:{ q:'Those in courtship must receive teachings from which bodies respectively?', options:['A. Boys from Women\'s Council; Girls from Men\'s Council','B. Boys from Men\'s Council; Girls from Women\'s Council','C. Both from Youth Advisors only','D. Both from Youth Pastor only'], answer:1, explanation:'Tradition 12: Boys receive teachings from the Men\'s Council; Girls from the Women\'s Council.' }, sn:{ q:'Avo vari muchato vanofanira kugamuchira dzidziso kupi?', options:['A. Vakomana kuMadzimai; Vasikana kuVarume','B. Vakomana kuVarume; Vasikana kuMadzimai','C. Vose kuVabatsiri chete','D. Vose kuMufundisi chete'], answer:1, explanation:'Sikirwo 12: Vakomana kuVarume; Vasikana kuMadzimai.' } },
    ],
    truefalse: [
      { id:'B-TF1', difficulty:'easy', en:{ q:'Running a secret relationship not known to Youth Pastor or Youth Advisors is gross misconduct.', answer:true, explanation:'Section B states this clearly.' }, sn:{ q:'Kufamba muhukama hwakavanzika husina kuzivikwa naMufundisi kana Vabatsiri ndiyo kusateerera kukuru.', answer:true, explanation:'Chikamu B chinoreva izvi pachena.' } },
      { id:'B-TF2', difficulty:'easy', en:{ q:'It is acceptable for a girl to approach a boy first to initiate a relationship in JRM.', answer:false, explanation:'Section B (a): It is taboo for a sister to lower standards and approach a brother.' }, sn:{ q:'Zvinogamuchirwa kuti musikana asvike kumukomana kutanga kutanga hukama muJRM.', answer:false, explanation:'Chikamu B (a): Zvinotsutswa.' } },
      { id:'B-TF3', difficulty:'medium', en:{ q:'If a boy and girl sin by being intimate with a virgin, the boy is obligated to marry that girl.', answer:true, explanation:'Tradition 13: The boy is obligated to marry that girl, and the girl must contact Youth Advisors immediately.' }, sn:{ q:'Kana mukomana nemusikana vakatadza nekubatana nemhandara, mukomana anofanira kuroora musikana iyeye.', answer:true, explanation:'Sikirwo 13: Mukomana anofanira kuroora, uye musikana anofanira kuzivisa Vabatsiri pakarepo.' } },
      { id:'B-TF4', difficulty:'medium', en:{ q:'Knowing about a secret relationship and not reporting it is acceptable since it is not your business.', answer:false, explanation:'Section B: Being aware and failing to report is equally misconduct and can attract disciplinary measures.' }, sn:{ q:'Kuziva nezve hukama hwakavanzika usingaburitse zvinogamuchirwa nekuti haisi nyaya yako.', answer:false, explanation:'Chikamu B: Kuziva nekusaburitse ndiyo kusateerera.' } },
      { id:'B-TF5', difficulty:'easy', en:{ q:'Those in courtship should continuously seek to attend lessons given by Youth Advisors and the Youth Pastor.', answer:true, explanation:'Tradition 11 states this directly.' }, sn:{ q:'Avo vari muchato vanofanira kugaratsenhera kuenda kudzidziso dzaVabatsiri neMufundisi.', answer:true, explanation:'Sikirwo 11 rinoreva izvi pachena.' } },
    ],
    fillin: [
      { id:'B-FG1', difficulty:'easy', en:{ q:'Any girl approached by a brother must confirm this to Youth Advisors before making any ___.', options:['Decision','Announcement','Complaint','Plan'], answer:0, explanation:'Section B (c): She must confirm before making any decision.' }, sn:{ q:'Musikana wose anoudzwa nemukomana anofanira kuzivisa Vabatsiri asati atora ___.', options:['Chisarudzo','Chipiro','Mhosho','Chinangwa'], answer:0, explanation:'Chikamu B (c).' } },
      { id:'B-FG2', difficulty:'medium', en:{ q:'A sister approaching a brother first to initiate a relationship commits ___ misdeeds.', options:['Babylonian','Minor','Spiritual','Acceptable'], answer:0, explanation:'Section B (a): Described as "Babylonian (worldly) misdeeds".' }, sn:{ q:'Hama sisi anouya kumukomana kutanga hukama anorehwa kunge aita mabasa e___.', options:['Bhabhironi','Diki','Kwemweya','Zvinogamuchirwa'], answer:0, explanation:'Chikamu B (a): Anonzi "mabasa eBhabhironi".' } },
      { id:'B-FG3', difficulty:'hard', en:{ q:'No boy or girl should embark on family duty or ___ issues without knowledge of the Youth Pastor or Advisors.', options:['Inheritance','Business','Education','Travel'], answer:0, explanation:'Tradition 14: Family duty/inheritance issues require knowledge of Youth Pastor or Advisors.' }, sn:{ q:'Hakuna mukomana kana musikana anofanira kutanga zve___ asina ruzivo rwaMufundisi kana Vabatsiri.', options:['Nhaka','Bhizinesi','Dzidzo','Rwendo'], answer:0, explanation:'Sikirwo 14.' } },
      { id:'B-FG4', difficulty:'medium', en:{ q:'A girl who is no longer a virgin should seek help with a ___ conscience.', options:['Pure','Guilty','Hidden','Proud'], answer:0, explanation:'Tradition 16: Girls who are no longer virgins are to seek help with a pure conscience.' }, sn:{ q:'Musikana asingachiri mhandara anofanira kutsvaga rubatsiro nemwoyo ___.', options:['Wakachena','Wemhosho','Wakavanzika','Wokuzvikudza'], answer:0, explanation:'Sikirwo 16.' } },
    ],
  },
  C: {
    scenarios: [
      { id:'C-S1', difficulty:'easy', en:{ q:'A group of JRM youth want to have a social gathering. What is required?', options:['A. They can meet freely as long as it\'s not at night','B. The gathering must be known to Coordinators or Youth Advisors','C. They only need to tell their parents','D. No restrictions as long as no alcohol is present'], answer:1, explanation:'Section C: No Youth gatherings shall be allowed without knowledge of Coordinators or Youth Advisors.' }, sn:{ q:'Boka revechidiki veJRM vanoda kuita musangano. Chii chinodiwa?', options:['A. Vanogona kusangana zvakasununguka','B. Musangano unofanira kuzikwa neVakuru kana Vabatsiri','C. Vanoda kuzivisa vabereki vavo chete','D. Hapana mipingamupinyi'], answer:1, explanation:'Chikamu C: Hapana musangano unobvumirwa pasina ruzivo rweVakuru kana Vabatsiri.' } },
      { id:'C-S2', difficulty:'medium', en:{ q:'A boy wants to invite a girl to his house. Under what condition is this permissible?', options:['A. If they are in an approved relationship','B. Only if other boys or girls accompany them','C. Never permissible under any circumstances','D. Only during the day'], answer:1, explanation:'Section C: Boys are disallowed to invite girls to their houses — only permissible if other boys or girls accompany them.' }, sn:{ q:'Mukomana anokoka musikana kumba kwake. Inogamuchirwa rinhi?', options:['A. Kana vari muhukama hwakabvumirwa','B. Chete kana vamwe vakomana kana vasikana vachivakomba','C. Haizombobvumirwi','D. Chete masikati'], answer:1, explanation:'Chikamu C: Inobvumirwa chete kana vamwe vachivakomba.' } },
      { id:'C-S3', difficulty:'hard', en:{ q:'A girl in an approved relationship cooks for her boyfriend at his house. Is this permitted?', options:['A. Yes, since they are in an approved relationship','B. No — girls cannot carry out wife duties to a brother under any circumstances','C. Yes, if other people are present','D. Yes, but only on weekends'], answer:1, explanation:'Section C: No girls are allowed to carry out housekeeping duties (cooking, washing, wife duties) to a brother — whether in a relationship or not.' }, sn:{ q:'Musikana ari muhukama hwakabvumirwa anomubikira kumba kwake. Izvi zvinobvumirwa here?', options:['A. Hongu nekuti vari muhukama hwakabvumirwa','B. Kwete — vasikana havabvumirwi kuita mabasa emukadzi kumukomana munhu wose wose','C. Hongu kana vamwe varipo','D. Hongu chete nevhiki'], answer:1, explanation:'Chikamu C: Hapana vasikana vanobvumirwi kuita mabasa emumba kumukomana.' } },
      { id:'C-S4', difficulty:'easy', en:{ q:'Youth members hear gossip about church leadership from fellow youth. What must they do?', options:['A. Share it with more people','B. Report to Youth Advisors or Youth Pastors','C. Ignore it completely','D. Post it on social media'], answer:1, explanation:'Section C: Brethren must report to Youth Advisors/Pastors any gossip about Church Leadership.' }, sn:{ q:'Vechidiki vananzwa nhepfenyuro nezve vatungamiri. Chii chinofanira kuitwa?', options:['A. Iparadzire vamwe','B. Zivisa Vabatsiri kana Mufundisi','C. Irega zvachose','D. Iisa pamhepo yemagariro'], answer:1, explanation:'Chikamu C: Hama dzinofanira kuzivisa Vabatsiri nhepfenyuro.' } },
    ],
    truefalse: [
      { id:'C-TF1', difficulty:'easy', en:{ q:'Boys and girls are allowed to sleep in the same room in JRM.', answer:false, explanation:'Section C: No boys and girls are allowed to sleep in the same room.' }, sn:{ q:'Vakomana nevasikana vanobvumirwi kurara mumba imwe muJRM.', answer:false, explanation:'Chikamu C chinoreva pachena: Havabvumirwi.' } },
      { id:'C-TF2', difficulty:'medium', en:{ q:'Every Youth for Jesus member is obliged to maintain contact and communication with the Youth Pastor and Youth Advisors.', answer:true, explanation:'Section C states this as a requirement.' }, sn:{ q:'Nhengo yose yeVechidiki vaJesu inofanira kugarakoshesera kubata naMufundisi weVechidiki neVabatsiri.', answer:true, explanation:'Chikamu C chinoreva izvi senheyo.' } },
      { id:'C-TF3', difficulty:'hard', en:{ q:'A girl in a relationship is allowed to cook and do housekeeping for her boyfriend in JRM.', answer:false, explanation:'Section C: No girls are allowed to carry out housekeeping duties to a brother — whether in a relationship or not.' }, sn:{ q:'Musikana ari muhukama anobvumirwi kubika uye kuita mabasa emumba kumurume wake.', answer:false, explanation:'Chikamu C: Hapana vasikana vanobvumirwi — vari muhukama kana kwete.' } },
      { id:'C-TF4', difficulty:'medium', en:{ q:'Youth gatherings are allowed without Knowledge of Coordinators or Youth Advisors as long as they are on church premises.', answer:false, explanation:'Section C: No Youth gatherings shall be allowed without knowledge of Coordinators or Youth Advisors — location does not change this rule.' }, sn:{ q:'Misangano yevechidiki inobvumirwa pasina ruzivo rweVakuru chero iri panzvimbo yekereke.', answer:false, explanation:'Chikamu C: Hapana musangano — nzvimbo haishanduri mutemo.' } },
    ],
    fillin: [
      { id:'C-FG1', difficulty:'easy', en:{ q:'No boys and girls are allowed to sleep in the ___ room.', options:['Same','Guest','Church','Any'], answer:0, explanation:'Section C.' }, sn:{ q:'Hapana vakomana nevasikana vanobvumirwi kurara mumba ___.', options:['Imwe','Yevaenzi','Yekereke','Yose'], answer:0, explanation:'Chikamu C.' } },
      { id:'C-FG2', difficulty:'medium', en:{ q:'Boys are disallowed from inviting girls to their houses unless accompanied by other ___.', options:['Boys or girls','Adults','Church members','Relatives'], answer:0, explanation:'Section C: Only permissible if other boys or girls accompany them.' }, sn:{ q:'Vakomana havabvumirwi kukoka vasikana kumba kunze kwekunge vachirevewa nevamwe ___.', options:['Vakomana kana vasikana','Vakuru','Nhengo dzekereke','Hama'], answer:0, explanation:'Chikamu C.' } },
      { id:'C-FG3', difficulty:'hard', en:{ q:'"Kushanya, kwete ___" is advice from Pastor G Baloyi to the Youth.', options:['Kushanyarika','Kurara','Kudya','Kupinga'], answer:0, explanation:'Section C: "Visit, don\'t overstay your welcome" — advice from Pastor G Baloyi.' }, sn:{ q:'"Kushanya, kwete ___" ndiyo mazano aPastor G Baloyi kuvechidiki.', options:['Kushanyarika','Kurara','Kudya','Kupinga'], answer:0, explanation:'Chikamu C.' } },
    ],
  },
  D: {
    scenarios: [
      { id:'D-S1', difficulty:'easy', en:{ q:'A JRM youth wants to pursue higher education. Who should they consult first?', options:['A. Only their parents','B. Youth Advisors or appropriate designees for career guidance','C. Friends from university','D. No one — education is personal'], answer:1, explanation:'Section D: Youths pursuing education should seek career guidance from Youth Advisors or appropriate designees.' }, sn:{ q:'Mudiki weJRM anoda kudzidza zvakakwirira. Anofanira kutaurirana nani?', options:['A. Vabereki vake chete','B. Vabatsiri kana avo vakagadzwa kuti vape mazano ebasa','C. Shamwari dzake','D. Hapana — isarudzo yemunhu'], answer:1, explanation:'Chikamu D: Vechidiki vanokurudzirwa kutsvaga mazano kuVabatsiri.' } },
      { id:'D-S2', difficulty:'medium', en:{ q:'What documents are JRM youth encouraged to hold as essential?', options:['A. Birth certificates and school transcripts','B. Passports and Driver\'s licences','C. Church membership cards and baptism certificates','D. Employment contracts and bank statements'], answer:1, explanation:'Section D: Youths are encouraged to hold Passports and Driver\'s licences.' }, sn:{ q:'Zvinyorwa zvipi zvakakurudzirwa kunge zvevechidiki veJRM?', options:['A. Zvitupa zvokuzvarwa nezvinyorwa zvekuchikoro','B. Mapasipoti nemarazvichero ekutyaira','C. Makadhi enhengo nezvitupa zvekubhabhatidzwa','D. Makontiraki ebasa'], answer:1, explanation:'Chikamu D: Mapasipoti nemarazvichero ekutyaira.' } },
      { id:'D-S3', difficulty:'hard', en:{ q:'Why are JRM youth encouraged to acquire skills through education?', options:['A. To get high-paying jobs outside the church','B. These skills are necessary when establishing business startups and should be valued','C. To compete with other denominations','D. To pay church tithes'], answer:1, explanation:'Section D: Skills from education are necessary when establishing business startups.' }, sn:{ q:'Nei vechidiki veJRM vachikurudzirwa kuwana zivo nedzidziso?', options:['A. Kuwana mabasa anobhadhara zvakanaka','B. Zivo idzi dzinodiwa pakumisikidza mabhizinesi','C. Kukwikwidza nezvitendero zvimwe','D. Kubhadhara zvinopiwa'], answer:1, explanation:'Chikamu D: Zivo idzi dzinodiwa pakumisikidza mabhizinesi.' } },
    ],
    truefalse: [
      { id:'D-TF1', difficulty:'easy', en:{ q:'JRM youth are instructed to have medical aid covers and funeral policy covers.', answer:true, explanation:'Section D: Every Youth is instructed to have medical aid and funeral covers to avoid burdening the church.' }, sn:{ q:'Vechidiki veJRM vainzwa kunge vane zvivharo zvehutano nezvemavharo erufu.', answer:true, explanation:'Chikamu D: Mudiki wose anofanira kuve nezvivharo kuti asaremeredza kereke.' } },
      { id:'D-TF2', difficulty:'medium', en:{ q:'Boys are encouraged to acquire residential stands and build houses for their families.', answer:true, explanation:'Section D states this directly.' }, sn:{ q:'Vakomana vanokurudzirwa kuwana nzvimbo dzeugaro nokuvaka dzimba nemhuri dzavo.', answer:true, explanation:'Chikamu D rinoreva izvi pachena.' } },
      { id:'D-TF3', difficulty:'hard', en:{ q:'JRM youth are discouraged from working in groups on projects.', answer:false, explanation:'Section D: Youths are encouraged to work in groups to establish projects in a viable, orderly, and professional way.' }, sn:{ q:'Vechidiki veJRM vanorambidzwa kushanda maboka mapurojekiti.', answer:false, explanation:'Chikamu D: Vanokurudzirwa kushanda maboka.' } },
      { id:'D-TF4', difficulty:'medium', en:{ q:'JRM youth are encouraged to have self-run projects to sustain themselves and minister in church.', answer:true, explanation:'Section D states this directly.' }, sn:{ q:'Vechidiki veJRM vanokurudzirwa kuve nemapurojekiti avo vene kuzvitiira uye kushumira mukereke.', answer:true, explanation:'Chikamu D rinoreva izvi pachena.' } },
    ],
    fillin: [
      { id:'D-FG1', difficulty:'easy', en:{ q:'Every Youth is instructed to have medical aid covers and ___ policy covers.', options:['Funeral','Life','Car','Property'], answer:0, explanation:'Section D: Medical aid and funeral covers are required.' }, sn:{ q:'Mudiki wose anoziviswa kuve nezvivharo zvehutano nezvemavharo e___.', options:['Rufu','Hupenyu','Motokari','Pfuma'], answer:0, explanation:'Chikamu D.' } },
      { id:'D-FG2', difficulty:'medium', en:{ q:'Youths seeking to pursue education should seek ___ guidance from Youth Advisors.', options:['Career','Financial','Spiritual','Social'], answer:0, explanation:'Section D: Career guidance from Youth Advisors or designees.' }, sn:{ q:'Vechidiki vanoda kudzidza vanofanira kutsvaga mazano e___ kuVabatsiri.', options:['Basa','Mari','Mweya','Ukama'], answer:0, explanation:'Chikamu D.' } },
      { id:'D-FG3', difficulty:'hard', en:{ q:'Youths are encouraged to work in groups to establish projects in a ___, orderly, and professional way.', options:['Viable','Secretive','Competitive','Independent'], answer:0, explanation:'Section D: Viable, orderly, and professional way.' }, sn:{ q:'Vechidiki vanokurudzirwa kushanda maboka kumisikidza mapurojekiti nenzira ___, yakagadzikana uye yemapurofesheni.', options:['Inogona','Yakavanzika','Yekukwikwidza','Yega yega'], answer:0, explanation:'Chikamu D.' } },
    ],
  },
  E: {
    scenarios: [
      { id:'E-S1', difficulty:'easy', en:{ q:'A JRM youth wants to do a business deal with an elder. What must happen first?', options:['A. Proceed if both parties agree','B. Notify senior stewards (bishops or elders) before proceeding','C. Inform Youth Advisor only after the deal','D. No notification needed for small deals'], answer:1, explanation:'Section E (1): Youths shall not engage in business with overseers, elders, and deacons without notifying senior stewards.' }, sn:{ q:'Mudiki weJRM anoda kuita bhizinesi nemukuru. Chii chinofanira kuitwa kutanga?', options:['A. Enderera mberi kana vose vakabvumirana','B. Zivisa vakuru vakuru (mabhishopi kana vakuru) asati aita','C. Zivisa Mubatsiri chete mushure','D. Hakuna kuzivisa'], answer:1, explanation:'Chikamu E (1): Vechidiki havafaniri kuita bhizinesi nevakuru pasina kuzivisa vakuru vakuru.' } },
      { id:'E-S2', difficulty:'medium', en:{ q:'Two JRM youth want to lend each other $60. What must happen?', options:['A. They can lend freely — they are friends','B. They must notify Advisors, Coordinators, or Stewards','C. They only need a written agreement','D. Fine if repaid within a month'], answer:1, explanation:'Section E (2): Youths shall not borrow each other money of $50 and above without notifying Advisors, Coordinators, or Stewards.' }, sn:{ q:'Vechidiki vaviri veJRM vanoda kushandisana mari ye$60. Chii chinofanira kuitika?', options:['A. Vanogona zvakasununguka — shamwari','B. Vanofanira kuzivisa Vabatsiri, Vakuru, kana Vashumiri','C. Vanoda kunyora dohwe chete','D. Zvakanaka chero idzoswa mumwedzi'], answer:1, explanation:'Chikamu E (2): $50 nepamusoro inodiwa kuzivisa.' } },
      { id:'E-S3', difficulty:'medium', en:{ q:'A JRM youth has a business dispute with a fellow believer. What should they do?', options:['A. Take the matter to civil court immediately','B. Report to the respective church leadership to resolve amicably','C. Handle it privately','D. Post about it on social media'], answer:1, explanation:'Section E (4): Youths facing business challenges with believers should report to respective leadership to resolve amicably.' }, sn:{ q:'Mudiki weJRM ane nharo yebhizinesi nomumwe mutendi. Chii chinofanira kuitwa?', options:['A. Isa nyaya kudare renyika','B. Zivisa vatungamiri vekereke kuti vaise nyaya pamupanda','C. Isa pakati pavo vega','D. Vhumura pamhepo'], answer:1, explanation:'Chikamu E (4): Zivisa vatungamiri vakanangana kuti vaite zvisungano.' } },
      { id:'E-S4', difficulty:'hard', en:{ q:'A JRM youth is spending beyond their means and accumulating debt. What does tradition advise?', options:['A. Borrow from church members','B. Live within their means and downsize whenever necessary to avoid debt traps','C. Ask the church for financial support','D. Take a bank loan instead'], answer:1, explanation:'Section E (6): Youths are strongly advised to live within their means and downsize when necessary to avoid debt traps.' }, sn:{ q:'Mudiki weJRM ari kupedza kupfuura zvaanazvo. Sikirwo reJRM rinoreva chii?', options:['A. Kwereta kubva kunhengo','B. Rarama nezvaanazvo uye menge achideredza kuti asangane nemisungo yechikwereti','C. Kumbira kereke kumubatsira','D. Tora chikwereti kubhangi'], answer:1, explanation:'Chikamu E (6): Rarama nezvaanazvo uye kuderedza.' } },
      { id:'E-S5', difficulty:'hard', en:{ q:'A youth wants to do business with their region coordinator. Who must be advised?', options:['A. Only the Youth Pastor','B. Senior stewards must be advised','C. No one — it\'s personal','D. Only the other party'], answer:1, explanation:'Section E (5): Business transactions between Youth and region/assembly coordinators should be advised to senior stewards.' }, sn:{ q:'Mudiki anoda kuita bhizinesi nemukuru wedutu rake. Ndiani anofanira kuziviswa?', options:['A. Mufundisi weVechidiki chete','B. Vakuru vakuru vanofanira kuziviswa','C. Hapana — inyaya yemunhu','D. Chete mumwe munhu'], answer:1, explanation:'Chikamu E (5): Vakuru vakuru vanofanira kuziviswa.' } },
    ],
    truefalse: [
      { id:'E-TF1', difficulty:'easy', en:{ q:'JRM youth are allowed to engage in business with ministers without notifying anyone.', answer:false, explanation:'Section E (3): Youths shall not engage in business with ministers without notifying the Youth Pastor.' }, sn:{ q:'Vechidiki veJRM vanobvumirwi kuita bhizinesi nevafundisi vasina kuzivisa munhu.', answer:false, explanation:'Chikamu E (3): Havafaniri pasina kuzivisa Mufundisi weVechidiki.' } },
      { id:'E-TF2', difficulty:'medium', en:{ q:'Youths may lend each other amounts below $50 without specifically notifying Advisors or Stewards.', answer:true, explanation:'Section E (2): The stated threshold is $50 and above — amounts strictly below $50 are not specifically prohibited.' }, sn:{ q:'Vechidiki vanogona kushandisana mari pasi pe$50 pasina kuzivisa Vabatsiri kana Vashumiri pachena.', answer:true, explanation:'Chikamu E (2): Muripo unotaurwa ndi$50 nepamusoro.' } },
      { id:'E-TF3', difficulty:'hard', en:{ q:'A youth who brings a business complaint not handled according to JRM instructions will be punished.', answer:true, explanation:'Section E (7): Any youth who brings a complaint of improprieties not handled per instructions shall be punished for causing disorder.' }, sn:{ q:'Mudiki anouya nemhosho yebhizinesi isina kuendeswa maererano nemirayiro yeJRM achapiwa mutongo.', answer:true, explanation:'Chikamu E (7): Achapiwa mutongo nekuda kwekukonzeresa kusagadzikana.' } },
      { id:'E-TF4', difficulty:'medium', en:{ q:'JRM youths are strongly advised to live within their means to avoid debt traps.', answer:true, explanation:'Section E (6) states this directly.' }, sn:{ q:'Vechidiki veJRM vanokurudzirwa zvakasimba kurarama nezvavanazvo kuti vasangane nemisungo yechikwereti.', answer:true, explanation:'Chikamu E (6) rinoreva izvi pachena.' } },
    ],
    fillin: [
      { id:'E-FG1', difficulty:'easy', en:{ q:'Youths shall not engage in business with overseers, elders, and deacons without notifying senior ___.', options:['Stewards','Members','Youth','Advisors'], answer:0, explanation:'Section E (1): Senior stewards (bishops or elders) must be notified.' }, sn:{ q:'Vechidiki havafaniri kuita bhizinesi nevakuru pasina kuzivisa vakuru ___.', options:['Vakuru','Nhengo','Vechidiki','Vabatsiri'], answer:0, explanation:'Chikamu E (1).' } },
      { id:'E-FG2', difficulty:'medium', en:{ q:'Youths shall not borrow each other money of $___ and above without notifying Advisors, Coordinators, or Stewards.', options:['50','100','20','200'], answer:0, explanation:'Section E (2): The threshold is $50.' }, sn:{ q:'Vechidiki havafaniri kushandisana mari ye$___ nepamusoro pasina kuzivisa Vabatsiri.', options:['50','100','20','200'], answer:0, explanation:'Chikamu E (2): Muripo ndi$50.' } },
      { id:'E-FG3', difficulty:'hard', en:{ q:'Youths are advised to live within their means and ___ whenever necessary to avoid debt traps.', options:['Downsize','Borrow','Invest','Spend'], answer:0, explanation:'Section E (6): Downsize whenever necessary.' }, sn:{ q:'Vechidiki vanokurudzirwa kurarama nezvavanazvo uye ___ nguva dzose dzaanodiwa kuti vasangane nemisungo yechikwereti.', options:['Kuderedza','Kukwereta','Kuisa mari','Kupedza'], answer:0, explanation:'Chikamu E (6).' } },
    ],
  },
};

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const safeGet = async (key, shared = false) => {
  try { const r = await window.storage.get(key, shared); return r.value; } catch { return null; }
};
const safeSet = async (key, value, shared = false) => {
  try { await window.storage.set(key, value, shared); return true; } catch { return false; }
};
const safeList = async (prefix, shared = false) => {
  try { const r = await window.storage.list(prefix, shared); return r.keys || []; } catch { return []; }
};

// ─── ANIMATION CSS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;}
button{cursor:pointer;border:none;font-family:'DM Sans',sans-serif;}
button:active{transform:scale(0.96)!important;}
input{font-family:'DM Sans',sans-serif;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.3);border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes glow{0%,100%{box-shadow:0 0 10px rgba(212,175,55,0.4)}50%{box-shadow:0 0 24px rgba(212,175,55,0.8)}}
@keyframes countUp{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}
@keyframes rowIn{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
@keyframes timerWarn{0%,100%{opacity:1}50%{opacity:0.5}}
.fu{animation:fadeUp 0.45s ease both}
.si{animation:slideIn 0.4s ease both}
.shake{animation:shake 0.45s ease}
.glow{animation:glow 2s ease-in-out infinite}
.cu{animation:countUp 0.4s ease}
`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GOLD = '#d4af37';
const DARK_GOLD = '#b8941f';
const GREEN = '#2ecc71';
const RED = '#e74c3c';
const YELLOW = '#f39c12';
const DIFF_COLORS = { easy: GREEN, medium: YELLOW, hard: RED };
const DIFF_TIMER = { easy: 30, medium: 20, hard: 15 };

const defaultProgress = () => ({
  A:{ scenarios:{done:false,best:0}, truefalse:{done:false,best:0}, fillin:{done:false,best:0} },
  B:{ scenarios:{done:false,best:0}, truefalse:{done:false,best:0}, fillin:{done:false,best:0} },
  C:{ scenarios:{done:false,best:0}, truefalse:{done:false,best:0}, fillin:{done:false,best:0} },
  D:{ scenarios:{done:false,best:0}, truefalse:{done:false,best:0}, fillin:{done:false,best:0} },
  E:{ scenarios:{done:false,best:0}, truefalse:{done:false,best:0}, fillin:{done:false,best:0} },
});

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TraditionsChallenge() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('home');

  // Game state
  const [section, setSection] = useState(null);
  const [mode, setMode] = useState(null);
  const [isPractice, setIsPractice] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timerMax, setTimerMax] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [pts, setPts] = useState(null);
  const [answered, setAnswered] = useState(0);
  const [reviewLog, setReviewLog] = useState([]);
  const [showReview, setShowReview] = useState(false);

  // Progress & leaderboard
  const [prog, setProg] = useState(defaultProgress());
  const [lb, setLb] = useState([]);
  const [pName, setPName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  // Group play
  const [grpScreen, setGrpScreen] = useState('menu');
  const [grpRole, setGrpRole] = useState('none');
  const [grpCode, setGrpCode] = useState('');
  const [grpName, setGrpName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [grpState, setGrpState] = useState(null);
  const [grpErr, setGrpErr] = useState('');
  const [grpAns, setGrpAns] = useState(null);
  const [hostQs, setHostQs] = useState([]);
  const [hostIdx, setHostIdx] = useState(0);
  const [grpSection, setGrpSection] = useState('A');
  const [codeCopied, setCodeCopied] = useState(false);

  const timerRef = useRef(null);
  const pollRef = useRef(null);
  const t = LANG[lang];

  // Theme helpers
  const bg = isDark ? '#0c1220' : '#f5f0e8';
  const fg = isDark ? '#e8e8e8' : '#1a1a2e';
  const muted = isDark ? '#8892a4' : '#6b7280';
  const cardBg = isDark ? 'rgba(255,255,255,0.045)' : 'rgba(0,0,0,0.04)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)';
  const inputBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';

  const S = {
    wrap: { minHeight:'100vh', background:bg, display:'flex', justifyContent:'center', color:fg, transition:'background 0.3s,color 0.3s', fontFamily:"'DM Sans',sans-serif" },
    inner: { width:'100%', maxWidth:480, padding:'0 16px 48px' },
    card: (ex={}) => ({ background:cardBg, border:`1px solid ${cardBorder}`, borderRadius:14, padding:16, backdropFilter:'blur(8px)', ...ex }),
    pBtn: (ex={}) => ({ background:`linear-gradient(135deg,${GOLD},${DARK_GOLD})`, color:'#1a1a2e', fontWeight:700, fontSize:15, padding:'14px 20px', borderRadius:12, width:'100%', transition:'opacity 0.2s', ...ex }),
    sBtn: (ex={}) => ({ background:'transparent', color:fg, fontWeight:600, fontSize:14, padding:'12px 18px', borderRadius:12, border:`1px solid ${cardBorder}`, width:'100%', transition:'opacity 0.2s', ...ex }),
    input: (ex={}) => ({ background:inputBg, border:`1px solid ${cardBorder}`, borderRadius:10, padding:'12px 14px', color:fg, fontSize:14, width:'100%', outline:'none', ...ex }),
    row: (ex={}) => ({ display:'flex', gap:10, ...ex }),
    h1: { fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800, color:GOLD, lineHeight:1.2 },
    h2: { fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:fg },
    badge: (c='#fff',bg2='rgba(255,255,255,0.1)') => ({ display:'inline-flex', alignItems:'center', gap:4, background:bg2, color:c, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }),
  };

  // ── Boot ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    (async () => {
      const saved = await safeGet('jrm-progress');
      if (saved) setProg(saved);
    })();
  }, []);

  const saveProg = useCallback(async (p) => {
    setProg(p);
    await safeSet('jrm-progress', p);
  }, []);

  // ── Leaderboard ───────────────────────────────────────────────────────────
  const loadLb = useCallback(async () => {
    const keys = await safeList('jrm-lb:', true);
    const rows = (await Promise.all(keys.map(k => safeGet(k, true)))).filter(Boolean);
    setLb(rows.sort((a,b) => b.score - a.score).slice(0,20));
  }, []);

  useEffect(() => { if (screen === 'leaderboard') loadLb(); }, [screen, loadLb]);

  // ── Section unlock ────────────────────────────────────────────────────────
  const unlocked = useCallback((sid) => {
    const order = ['A','B','C','D','E'];
    const i = order.indexOf(sid);
    if (i === 0) return true;
    const prev = prog[order[i-1]];
    return Object.values(prev).some(m => m.done);
  }, [prog]);

  // ── Start game ────────────────────────────────────────────────────────────
  const shuffleOptions = (q) => {
    // Only shuffle questions that have options (not true/false)
    if (!q.en.options) return q;
    const shuffleFor = (langData) => {
      const indexed = langData.options.map((opt, i) => ({opt, isAnswer: i === langData.answer}));
      for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
      }
      return {
        ...langData,
        options: indexed.map(x => x.opt),
        answer: indexed.findIndex(x => x.isAnswer),
      };
    };
    return {...q, en: shuffleFor(q.en), sn: shuffleFor(q.sn)};
  };

  const startGame = useCallback((sec, md, practice=false) => {
    const qs = [...QUESTIONS[sec][md]].sort((a,b) => {
      const o = {easy:0,medium:1,hard:2};
      return o[a.difficulty] - o[b.difficulty];
    }).map(shuffleOptions);
    const first = qs[0];
    const tm = DIFF_TIMER[first?.difficulty] || 20;
    setQuestions(qs); setQIdx(0); setChosen(null); setCorrect(null);
    setScore(0); setStreak(0); setBestStreak(0);
    setTimer(tm); setTimerMax(tm); setTimerOn(true);
    setShowWhy(false); setPts(null); setAnswered(0);
    setReviewLog([]); setShowReview(false);
    setSubmitted(false); setSubmitMsg('');
    setSection(sec); setMode(md); setIsPractice(practice);
    setScreen('game');
  }, []);

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerOn || chosen !== null) return;
    if (timer <= 0) { handleAnswer(null); return; }
    timerRef.current = setTimeout(() => setTimer(x => x-1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timer, timerOn, chosen]);

  // ── Answer ────────────────────────────────────────────────────────────────
  const handleAnswer = useCallback((ans) => {
    clearTimeout(timerRef.current);
    setTimerOn(false);
    setChosen(ans ?? -1);
    const q = questions[qIdx];
    const isTimeout = ans === null;
    let ok = false;
    if (!isTimeout) ok = (ans === q[lang].answer);
    setCorrect(ok);
    let base=0, spd=0, strk=0;
    if (ok) {
      const dp = {easy:10,medium:20,hard:35};
      base = dp[q.difficulty]||10;
      spd = Math.round((timer/timerMax)*base);
      const ns = streak+1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
      if (ns >= 2) strk = ns*5;
      setScore(s => s+base+spd+strk);
    } else { setStreak(0); }
    setPts({base,spd,strk});
    setAnswered(a => a+1);
    setReviewLog(log => [...log, {q, chosen: ans ?? -1, correct: ok, lang}]);
  }, [questions, qIdx, lang, timer, timerMax, streak, bestStreak]);

  // ── Next question ─────────────────────────────────────────────────────────
  const nextQ = useCallback(() => {
    const ni = qIdx+1;
    if (ni >= questions.length) {
      if (!isPractice) {
        const np = JSON.parse(JSON.stringify(prog));
        if (score > (np[section][mode]?.best||0)) np[section][mode].best = score;
        np[section][mode].done = true;
        saveProg(np);
      }
      setScreen('results');
      return;
    }
    const q = questions[ni];
    const tm = DIFF_TIMER[q.difficulty]||20;
    setQIdx(ni); setChosen(null); setCorrect(null);
    setShowWhy(false); setPts(null);
    setTimer(tm); setTimerMax(tm); setTimerOn(true);
  }, [qIdx, questions, isPractice, prog, score, section, mode, saveProg]);

  // ── Submit score ──────────────────────────────────────────────────────────
  const submitScore = useCallback(async () => {
    if (!pName.trim()) { setSubmitMsg(t.nameRequired); return; }
    const key = `jrm-lb:${pName.trim().replace(/\s+/g,'_')}_${Date.now()}`;
    await safeSet(key, { name:pName.trim(), section, mode, score, date:new Date().toLocaleDateString() }, true);
    setSubmitted(true); setSubmitMsg(t.scoreSubmitted);
  }, [pName, section, mode, score, t]);

  // ── Group play helpers ────────────────────────────────────────────────────
  const genCode = () => {
    const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length:6}, () => ch[Math.floor(Math.random()*ch.length)]).join('');
  };

  const startPoll = useCallback((code) => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const s = await safeGet(`jrm-group:${code}`, true);
      if (s) setGrpState(s);
    }, 2000);
  }, []);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  const createGame = useCallback(async () => {
    if (!grpName.trim()) { setGrpErr(t.nameRequired); return; }
    const code = genCode();
    const qs = Object.values(QUESTIONS[grpSection]).flat()
      .sort((a,b) => ({easy:0,medium:1,hard:2}[a.difficulty]-{easy:0,medium:1,hard:2}[b.difficulty]))
      .slice(0,10)
      .map(shuffleOptions);
    setHostQs(qs); setGrpCode(code);
    const state = { host:grpName.trim(), status:'lobby', section:grpSection,
      players:[{name:grpName.trim(),id:'host',score:0}],
      currentQuestion:0, startedAt:null,
      questions:qs.map(q=>({id:q.id,difficulty:q.difficulty,en:q.en,sn:q.sn})) };
    await safeSet(`jrm-group:${code}`, state, true);
    setGrpState(state); setGrpRole('host'); setGrpScreen('hostLobby');
    startPoll(code);
  }, [grpName, grpSection, t, startPoll]);

  const joinGame = useCallback(async () => {
    if (!grpName.trim()) { setGrpErr(t.nameRequired); return; }
    if (!joinCode.trim()) { setGrpErr(t.codeRequired); return; }
    const code = joinCode.trim().toUpperCase();
    const state = await safeGet(`jrm-group:${code}`, true);
    if (!state) { setGrpErr(t.gameNotFound); return; }
    const pid = `p_${Date.now()}`;
    const ns = {...state, players:[...state.players,{name:grpName.trim(),id:pid,score:0}]};
    await safeSet(`jrm-group:${code}`, ns, true);
    setGrpCode(code); setGrpState(ns); setGrpRole('player');
    setGrpScreen('joinLobby'); startPoll(code);
  }, [grpName, joinCode, t, startPoll]);

  const hostStart = useCallback(async () => {
    const s = await safeGet(`jrm-group:${grpCode}`, true);
    if (!s) return;
    const ns = {...s, status:'playing', startedAt:Date.now(), currentQuestion:0};
    await safeSet(`jrm-group:${grpCode}`, ns, true);
    setGrpState(ns); setGrpScreen('hostGame'); setHostIdx(0);
  }, [grpCode]);

  const hostNext = useCallback(async () => {
    const ni = hostIdx+1;
    if (ni >= hostQs.length) {
      const s = await safeGet(`jrm-group:${grpCode}`, true);
      const ns = {...s, status:'ended'};
      await safeSet(`jrm-group:${grpCode}`, ns, true);
      setGrpState(ns); return;
    }
    setHostIdx(ni);
    const s = await safeGet(`jrm-group:${grpCode}`, true);
    const ns = {...s, currentQuestion:ni};
    await safeSet(`jrm-group:${grpCode}`, ns, true);
    setGrpState(ns);
  }, [hostIdx, hostQs, grpCode]);

  const playerAnswer = useCallback(async (ans) => {
    if (grpAns !== null) return;
    setGrpAns(ans);
    const q = grpState?.questions?.[grpState?.currentQuestion];
    if (!q) return;
    const ok = ans === q[lang].answer;
    const dp = {easy:10,medium:20,hard:35};
    const pts = ok ? (dp[q.difficulty]||10) : 0;
    // Write score back into the shared game state so leaderboard shows real scores
    const latest = await safeGet(`jrm-group:${grpCode}`, true);
    if (latest) {
      const updated = {...latest, players: latest.players.map(p =>
        p.name === grpName ? {...p, score: (p.score||0) + pts} : p
      )};
      await safeSet(`jrm-group:${grpCode}`, updated, true);
    }
  }, [grpAns, grpState, lang, grpCode, grpName]);

  useEffect(() => {
    if (grpRole==='player' && grpState?.status==='playing') setGrpAns(null);
  }, [grpState?.currentQuestion, grpRole, grpState?.status]);

  // ── Perf label ────────────────────────────────────────────────────────────
  const perf = () => {
    const dp = {easy:10, medium:20, hard:35};
    const max = questions.reduce((sum, q) => sum + (dp[q.difficulty]||10), 0);
    const r = max > 0 ? score/max : 0;
    if (r>=0.9) return {emoji:'🏆', label:t.perfect};
    if (r>=0.65) return {emoji:'⭐', label:t.great};
    if (r>=0.35) return {emoji:'📖', label:t.good};
    return {emoji:'📚', label:t.keep};
  };

  const sectionName = (id) => t[`section${id}`];
  const modeName = (m) => ({ scenarios:t.scenarios, truefalse:t.trueOrFalse, fillin:t.fillTheGap }[m]);

  // ═══════════════════════════════════════════════════════════════════════════
  // ── HOME SCREEN ────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'home') return (
    <div style={S.wrap}>
      <div style={S.inner}>
        <div style={{...S.row(), justifyContent:'flex-end', paddingTop:16, gap:8}}>
          <button onClick={()=>setIsDark(d=>!d)} style={S.sBtn({width:'auto',padding:'8px 12px',fontSize:13})}>
            {isDark?'☀️':'🌙'}
          </button>
          <button onClick={()=>setLang(l=>l==='en'?'sn':'en')} style={S.sBtn({width:'auto',padding:'8px 14px',fontSize:13,fontWeight:700})}>
            {lang==='en'?'Shona':'English'}
          </button>
        </div>

        <div className="fu" style={{textAlign:'center',padding:'28px 0 24px'}}>
          <div style={{marginBottom:10,display:'flex',justifyContent:'center'}}>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4QL+RXhpZgAATU0AKgAAAAgABAE7AAIAAAARAAABSodpAAQAAAABAAABXJydAAEAAAAiAAAC1OocAAcAAAEMAAAAPgAAAAAc6gAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGVyY2l2YWwgTWFod2F5YQAAAAWQAwACAAAAFAAAAqqQBAACAAAAFAAAAr6SkQACAAAAAzI4AACSkgACAAAAAzI4AADqHAAHAAABDAAAAZ4AAAAAHOoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMjY6MDQ6MDQgMjM6MDc6NTcAMjAyNjowNDowNCAyMzowNzo1NwAAAFAAZQByAGMAaQB2AGEAbAAgAE0AYQBoAHcAYQB5AGEAAAD/4QQjaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIvPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj48eG1wOkNyZWF0ZURhdGU+MjAyNi0wNC0wNFQyMzowNzo1Ny4yODI8L3htcDpDcmVhdGVEYXRlPjwvcmRmOkRlc2NyaXB0aW9uPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48ZGM6Y3JlYXRvcj48cmRmOlNlcSB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6bGk+UGVyY2l2YWwgTWFod2F5YTwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAg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" alt="Royal Kingdom of Ziklag" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:`3px solid ${GOLD}`,boxShadow:`0 0 18px ${GOLD}55`}} />
          </div>
          <h1 style={S.h1}>{t.appTitle}</h1>
          <p style={{fontSize:13,color:muted,marginTop:4,letterSpacing:3,textTransform:'uppercase',fontWeight:700}}>
            {t.appSubtitle}
          </p>
          <div style={S.badge(GOLD,`${GOLD}22`)}>JRM — Jesus Revelation Ministries</div>
        </div>

        <div className="fu" style={{display:'flex',flexDirection:'column',gap:12,animationDelay:'0.1s'}}>
          <button className="glow" onClick={()=>{ setIsPractice(false); setScreen('sectionSelect'); }} style={S.pBtn({padding:'16px',fontSize:16})}>
            🎯 {t.startChallenge}
          </button>
          <button onClick={()=>{ setIsPractice(true); setScreen('sectionSelect'); }} style={S.sBtn()}>
            📚 {t.soloPractice}
          </button>
          <button onClick={()=>{ setScreen('groupPlay'); setGrpScreen('menu'); setGrpErr(''); }} style={S.sBtn()}>
            👥 {t.groupPlay}
          </button>
          <div style={S.row()}>
            <button onClick={()=>setScreen('leaderboard')} style={S.sBtn()}>🏆 {t.leaderboard}</button>
            <button onClick={()=>setScreen('progress')} style={S.sBtn()}>📊 {t.progress}</button>
          </div>
        </div>

        <div className="fu" style={{...S.card({marginTop:28,textAlign:'center',padding:'18px 20px'}),animationDelay:'0.2s'}}>
          <p style={{fontSize:13,color:muted,fontStyle:'italic',lineHeight:1.7}}>{t.bibleVerse}</p>
          <p style={{fontSize:12,color:GOLD,marginTop:8,fontWeight:700}}>{t.bibleRef}</p>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ── SECTION SELECT ─────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'sectionSelect') {
    const icons = {A:'💑',B:'📋',C:'🤝',D:'🚀',E:'💼'};
    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',justifyContent:'space-between',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setScreen('home')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
            <button onClick={()=>setLang(l=>l==='en'?'sn':'en')} style={S.sBtn({width:'auto',padding:'8px 12px',fontSize:12,fontWeight:700})}>
              {lang==='en'?'Shona':'English'}
            </button>
          </div>
          <h2 className="fu" style={{...S.h2,marginBottom:16}}>{t.selectSection}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {SECTIONS.map((sec,i)=>{
              const isOpen = unlocked(sec.id);
              const secProg = prog[sec.id];
              const done = Object.values(secProg).filter(m=>m.done).length;
              return (
                <button key={sec.id} className="si" disabled={!isOpen}
                  style={{...S.card({padding:'16px 18px',textAlign:'left',cursor:isOpen?'pointer':'not-allowed',
                    opacity:isOpen?1:0.5,border:`1px solid ${isOpen?cardBorder:'transparent'}`,
                    background:isOpen?cardBg:'rgba(0,0,0,0.1)',animationDelay:`${i*0.06}s`,
                    transition:'transform 0.15s,box-shadow 0.15s'}),display:'block'}}
                  onClick={()=>{ if(isOpen){ setSection(sec.id); setScreen('modeSelect'); } }}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <span style={{fontSize:28}}>{icons[sec.id]}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:15,color:isOpen?fg:muted}}>
                          {sec.id}. {sectionName(sec.id)}
                        </div>
                        {isOpen
                          ? <div style={{fontSize:12,color:muted,marginTop:2}}>{done}/3 {t.modesComplete}</div>
                          : <div style={{fontSize:12,color:RED,marginTop:2}}>🔒 {t.completePrevious}</div>
                        }
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{display:'flex',gap:4}}>
                        {['scenarios','truefalse','fillin'].map(m=>(
                          <div key={m} style={{width:10,height:10,borderRadius:'50%',
                            background:secProg[m].done?GOLD:cardBorder}} />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── MODE SELECT ────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'modeSelect') {
    const modeInfo = [
      { key:'scenarios', icon:'🎭', desc:t.scenariosDesc },
      { key:'truefalse', icon:'⚡', desc:t.trueOrFalseDesc },
      { key:'fillin',    icon:'✏️', desc:t.fillTheGapDesc },
    ];
    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',justifyContent:'space-between',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setScreen('sectionSelect')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
            <span style={{fontWeight:700,color:GOLD}}>{section}. {sectionName(section)}</span>
          </div>
          <h2 className="fu" style={{...S.h2,marginBottom:16}}>{t.selectMode}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {modeInfo.map((mi,i)=>{
              const mp = prog[section][mi.key];
              const qCount = QUESTIONS[section][mi.key].length;
              return (
                <button key={mi.key} className="si"
                  style={{...S.card({padding:'18px',textAlign:'left',cursor:'pointer',animationDelay:`${i*0.07}s`}),display:'block'}}
                  onClick={()=>startGame(section, mi.key, isPractice)}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:14}}>
                      <span style={{fontSize:30}}>{mi.icon}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:15}}>{modeName(mi.key)}</div>
                        <div style={{fontSize:12,color:muted,marginTop:2}}>{qCount} {t.questions} · {mi.desc}</div>
                        {mp.done && <div style={{fontSize:11,color:GOLD,marginTop:3}}>★ {t.bestScore}: {mp.best}</div>}
                      </div>
                    </div>
                    {mp.done && <span style={{fontSize:20}}>✅</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── GAME SCREEN ────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'game') {
    const q = questions[qIdx];
    if (!q) return null;
    const qData = q[lang];
    const total = questions.length;
    const timerPct = timerMax > 0 ? timer/timerMax : 0;
    const timerColor = timerPct > 0.5 ? GREEN : timerPct > 0.25 ? YELLOW : RED;
    const answered2 = chosen !== null;
    const isTimeout = chosen === -1;

    const feedback = isTimeout ? t.timesUp : correct ? t.correct : t.notQuite;
    const fbColor = isTimeout ? YELLOW : correct ? GREEN : RED;

    const renderOptions = () => {
      if (mode === 'truefalse') {
        return (
          <div style={S.row()}>
            {[true,false].map(v=>{
              const isChosen = chosen !== null && chosen !== -1 && chosen === v;
              const isWrong = answered2 && isChosen && !correct;
              const isRight = answered2 && v === qData.answer;
              let bg2 = cardBg;
              if (isRight && answered2) bg2 = `${GREEN}22`;
              if (isWrong) bg2 = `${RED}22`;
              return (
                <button key={String(v)} disabled={answered2}
                  className={isWrong?'shake':''}
                  style={{...S.card({flex:1,padding:'20px 12px',textAlign:'center',cursor:answered2?'default':'pointer',
                    background:bg2,border:`2px solid ${isRight&&answered2?GREEN:isWrong?RED:cardBorder}`,
                    transition:'background 0.25s,border 0.25s'}),fontSize:18,fontWeight:700,color:isRight&&answered2?GREEN:isWrong?RED:fg}}
                  onClick={()=>!answered2&&handleAnswer(v)}>
                  {v ? t.true : t.false}
                </button>
              );
            })}
          </div>
        );
      }

      if (mode === 'fillin') {
        return (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {qData.options.map((opt,i)=>{
              const isChosen = answered2 && chosen === i;
              const isWrong = isChosen && !correct;
              const isRight = answered2 && i === qData.answer;
              let bg2 = cardBg;
              if (isRight && answered2) bg2 = `${GREEN}22`;
              if (isWrong) bg2 = `${RED}22`;
              return (
                <button key={i} disabled={answered2}
                  className={isWrong?'shake':''}
                  style={{...S.card({padding:'16px 12px',textAlign:'center',cursor:answered2?'default':'pointer',
                    background:bg2,border:`2px solid ${isRight&&answered2?GREEN:isWrong?RED:cardBorder}`,
                    transition:'background 0.25s,border 0.25s'}),fontSize:14,fontWeight:600,color:isRight&&answered2?GREEN:isWrong?RED:fg}}
                  onClick={()=>!answered2&&handleAnswer(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
        );
      }

      // scenarios
      return (
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {qData.options.map((opt,i)=>{
            const isChosen = answered2 && chosen === i;
            const isWrong = isChosen && !correct;
            const isRight = answered2 && i === qData.answer;
            let bg2 = cardBg;
            if (isRight && answered2) bg2 = `${GREEN}22`;
            if (isWrong) bg2 = `${RED}22`;
            return (
              <button key={i} disabled={answered2}
                className={isWrong?'shake':''}
                style={{...S.card({padding:'14px 16px',textAlign:'left',cursor:answered2?'default':'pointer',
                  background:bg2,border:`2px solid ${isRight&&answered2?GREEN:isWrong?RED:cardBorder}`,
                  transition:'background 0.25s,border 0.25s'}),fontSize:14,fontWeight:500,color:isRight&&answered2?GREEN:isWrong?RED:fg}}
                onClick={()=>!answered2&&handleAnswer(i)}>
                {opt}
              </button>
            );
          })}
        </div>
      );
    };

    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          {/* Top bar */}
          <div style={{...S.row(),alignItems:'center',justifyContent:'space-between',paddingTop:14,marginBottom:14}}>
            <button onClick={()=>{ if(window.confirm('Quit this round? Your progress will not be saved.')){ clearTimeout(timerRef.current); setScreen('modeSelect'); } }} style={S.sBtn({width:'auto',padding:'8px 14px',fontSize:13})}>
              ✕
            </button>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontWeight:700,color:GOLD,fontSize:14}}>🔥 {streak}</span>
              <span style={{fontWeight:700,fontSize:14}}>⭐ {score}</span>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{display:'flex',gap:4,marginBottom:14}}>
            {questions.map((_,i)=>(
              <div key={i} style={{flex:1,height:4,borderRadius:4,
                background:i<qIdx?GOLD:i===qIdx?(answered2?(correct?GREEN:RED):GOLD):cardBorder,
                transition:'background 0.3s'}} />
            ))}
          </div>

          {/* Timer bar */}
          <div style={{height:6,background:cardBg,borderRadius:6,marginBottom:18,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${timerPct*100}%`,background:timerColor,
              borderRadius:6,transition:'width 0.9s linear, background 0.5s',
              animation:timerPct<0.25?'timerWarn 0.5s ease-in-out infinite':undefined}} />
          </div>

          {/* Q header */}
          <div style={{...S.row(),gap:8,marginBottom:12,flexWrap:'wrap'}}>
            <span style={S.badge(DIFF_COLORS[q.difficulty],`${DIFF_COLORS[q.difficulty]}22`)}>
              {t[q.difficulty]}
            </span>
            <span style={S.badge(GOLD,`${GOLD}22`)}>
              {modeName(mode)}
            </span>
            <span style={{...S.badge(muted,cardBg),marginLeft:'auto'}}>
              {qIdx+1} / {total}
            </span>
          </div>

          {/* Timer number */}
          <div style={{textAlign:'center',marginBottom:4}}>
            <span style={{fontSize:13,fontWeight:700,color:timerColor}}>{answered2?'':timer+'s'}</span>
          </div>

          {/* Question */}
          <div style={S.card({marginBottom:18,padding:'18px 16px'})}>
            <p style={{fontSize:16,fontWeight:600,lineHeight:1.65}}>{qData.q}</p>
          </div>

          {/* Options */}
          {renderOptions()}

          {/* Feedback */}
          {answered2 && (
            <div className="fu" style={{marginTop:16}}>
              <div style={{...S.card({padding:'14px 16px',border:`1px solid ${fbColor}44`,background:`${fbColor}12`})}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontWeight:700,color:fbColor,fontSize:15}}>{feedback}</span>
                  {pts && (pts.base>0||pts.spd>0||pts.strk>0) && (
                    <div style={{display:'flex',gap:6}}>
                      {pts.base>0&&<span style={S.badge(GREEN,`${GREEN}22`)}>+{pts.base} {t.base}</span>}
                      {pts.spd>0&&<span style={S.badge(YELLOW,`${YELLOW}22`)}>+{pts.spd} {t.speed}</span>}
                      {pts.strk>0&&<span style={S.badge(GOLD,`${GOLD}22`)}>+{pts.strk} {t.streakLabel}</span>}
                    </div>
                  )}
                </div>
                <button onClick={()=>setShowWhy(w=>!w)}
                  style={{marginTop:8,background:'none',border:'none',color:muted,fontSize:12,fontWeight:700,padding:0,cursor:'pointer',textDecoration:'underline'}}>
                  {showWhy ? '▲' : '▼'} {t.why}
                </button>
                {showWhy && <p style={{marginTop:8,fontSize:13,color:muted,lineHeight:1.6}}>{qData.explanation}</p>}
              </div>
              <button onClick={nextQ} style={{...S.pBtn({marginTop:12})}}>
                {qIdx+1 < total ? t.next+' →' : t.finish+' ✓'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── RESULTS SCREEN ─────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'results') {
    const p = perf();
    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{textAlign:'center',paddingTop:32}} className="fu">
            <div style={{fontSize:64,marginBottom:8}}>{p.emoji}</div>
            <h1 style={{...S.h1,marginBottom:6}}>{p.label}</h1>
            <div style={{fontSize:48,fontWeight:800,color:GOLD,fontFamily:"'Playfair Display',serif",
              animation:'countUp 0.6s ease both',animationDelay:'0.3s'}}>{score}</div>
            <p style={{color:muted,fontSize:13,marginTop:4}}>{t.score}</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,margin:'24px 0'}}>
            {[
              {label:t.bestStreakLabel, value:`🔥 ${bestStreak}`},
              {label:t.answered, value:`${answered}/${questions.length}`},
              {label:t.selectSection, value:`${section}: ${sectionName(section)}`},
              {label:t.selectMode, value:modeName(mode)},
            ].map((r,i)=>(
              <div key={i} className="fu" style={{...S.card({textAlign:'center',padding:'14px 10px'}),animationDelay:`${0.15+i*0.07}s`}}>
                <div style={{fontSize:16,fontWeight:700}}>{r.value}</div>
                <div style={{fontSize:11,color:muted,marginTop:4}}>{r.label}</div>
              </div>
            ))}
          </div>

          {!isPractice && !submitted && (
            <div className="fu" style={S.card({marginBottom:14,padding:'16px'})}>
              <p style={{fontSize:13,color:muted,marginBottom:10}}>{t.enterName}</p>
              <input value={pName} onChange={e=>setPName(e.target.value)} placeholder={t.enterName}
                style={S.input({marginBottom:10})} />
              <button onClick={submitScore} style={S.pBtn()}>{t.submitScore}</button>
              {submitMsg && <p style={{color:RED,fontSize:13,marginTop:8,textAlign:'center'}}>{submitMsg}</p>}
            </div>
          )}
          {submitted && <p style={{color:GREEN,textAlign:'center',fontWeight:700,marginBottom:14}}>{submitMsg}</p>}

          <div style={S.row()}>
            <button onClick={()=>startGame(section,mode,isPractice)} style={S.sBtn()}>🔄 {t.tryAgain}</button>
            <button onClick={()=>setScreen('home')} style={S.pBtn()}>🏠 {t.home}</button>
          </div>

          {/* Answer review toggle */}
          <button onClick={()=>setShowReview(r=>!r)}
            style={{...S.sBtn({marginTop:14})}}>
            {showReview ? '▲ Hide Review' : '▼ Review Answers'}
          </button>

          {showReview && (
            <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:10}}>
              {reviewLog.map((entry, i) => {
                const qd = entry.q[entry.lang];
                const isTimeout = entry.chosen === -1;
                const color = entry.correct ? GREEN : RED;
                return (
                  <div key={i} className="fu" style={{...S.card({padding:'14px 16px',
                    border:`1px solid ${color}44`, background:`${color}0d`}),
                    animationDelay:`${i*0.04}s`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                      <span style={{fontSize:12,fontWeight:700,color:muted}}>Q{i+1} · {entry.q.difficulty}</span>
                      <span style={{fontSize:13,fontWeight:700,color}}>{entry.correct ? '✓ Correct' : isTimeout ? '⏱ Timed out' : '✗ Wrong'}</span>
                    </div>
                    <p style={{fontSize:13,fontWeight:600,lineHeight:1.5,marginBottom:8}}>{qd.q}</p>
                    {qd.options ? (
                      <div style={{display:'flex',flexDirection:'column',gap:4}}>
                        {qd.options.map((opt,oi)=>{
                          const isAnswer = oi === qd.answer;
                          const wasChosen = oi === entry.chosen;
                          return (
                            <div key={oi} style={{fontSize:12,padding:'6px 10px',borderRadius:8,
                              background: isAnswer ? `${GREEN}22` : wasChosen && !entry.correct ? `${RED}22` : 'transparent',
                              color: isAnswer ? GREEN : wasChosen && !entry.correct ? RED : muted,
                              fontWeight: isAnswer || wasChosen ? 700 : 400,
                              border:`1px solid ${isAnswer ? GREEN+'44' : wasChosen && !entry.correct ? RED+'44' : 'transparent'}`}}>
                              {isAnswer ? '✓ ' : wasChosen && !entry.correct ? '✗ ' : '   '}{opt}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{display:'flex',gap:8}}>
                        {[true,false].map(v=>{
                          const isAnswer = v === qd.answer;
                          const wasChosen = v === entry.chosen;
                          return (
                            <div key={String(v)} style={{flex:1,textAlign:'center',padding:'8px',borderRadius:8,
                              background: isAnswer ? `${GREEN}22` : wasChosen && !entry.correct ? `${RED}22` : 'transparent',
                              color: isAnswer ? GREEN : wasChosen && !entry.correct ? RED : muted,
                              fontWeight:700,fontSize:13,
                              border:`1px solid ${isAnswer ? GREEN+'44' : wasChosen && !entry.correct ? RED+'44' : 'transparent'}`}}>
                              {isAnswer ? '✓ ' : wasChosen && !entry.correct ? '✗ ' : ''}{v ? t.true : t.false}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <p style={{fontSize:11,color:muted,marginTop:8,lineHeight:1.5,fontStyle:'italic'}}>{qd.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── LEADERBOARD ────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'leaderboard') {
    const medals = ['🥇','🥈','🥉'];
    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',justifyContent:'space-between',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setScreen('home')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
            <h2 style={S.h2}>🏆 {t.leaderboard}</h2>
          </div>
          {lb.length === 0
            ? <div style={{textAlign:'center',color:muted,padding:'40px 0'}}>{t.noScores}</div>
            : lb.map((row,i)=>(
              <div key={i} className="si" style={{...S.card({marginBottom:10,padding:'14px 16px',
                background:i===0?`${GOLD}14`:cardBg}),animationDelay:`${i*0.05}s`}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:20,width:28}}>{medals[i]||`${i+1}`}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:15}}>{row.name}</div>
                    <div style={{fontSize:12,color:muted}}>{row.section && sectionName(row.section)} · {row.date}</div>
                  </div>
                  <div style={{fontWeight:800,fontSize:18,color:GOLD}}>{row.score}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── PROGRESS ───────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'progress') {
    const icons2 = {A:'💑',B:'📋',C:'🤝',D:'🚀',E:'💼'};
    const modeIcons = {scenarios:'🎭',truefalse:'⚡',fillin:'✏️'};
    return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',justifyContent:'space-between',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setScreen('home')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
            <h2 style={S.h2}>📊 {t.progress}</h2>
          </div>
          {SECTIONS.map((sec,i)=>{
            const sp = prog[sec.id];
            const done = Object.values(sp).filter(m=>m.done).length;
            const isOpen = unlocked(sec.id);
            return (
              <div key={sec.id} className="si" style={{...S.card({marginBottom:12,opacity:isOpen?1:0.45}),animationDelay:`${i*0.07}s`}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                  <span style={{fontSize:24}}>{icons2[sec.id]}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700}}>{sec.id}. {sectionName(sec.id)}</div>
                    <div style={{height:5,background:cardBg,borderRadius:5,marginTop:5,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${(done/3)*100}%`,background:GOLD,borderRadius:5,transition:'width 0.4s'}} />
                    </div>
                  </div>
                  <span style={{fontWeight:800,color:GOLD,fontSize:15}}>{done}/3</span>
                </div>
                <div style={{display:'flex',gap:8}}>
                  {['scenarios','truefalse','fillin'].map(mk=>(
                    <div key={mk} style={{...S.card({flex:1,padding:'10px 8px',textAlign:'center',
                      border:`1px solid ${sp[mk].done?GOLD:cardBorder}`})}}>
                      <div style={{fontSize:18}}>{sp[mk].done?'✅':modeIcons[mk]}</div>
                      <div style={{fontSize:10,color:muted,marginTop:4,fontWeight:600}}>{modeName(mk)}</div>
                      {sp[mk].done && <div style={{fontSize:11,color:GOLD,fontWeight:700,marginTop:2}}>★{sp[mk].best}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ── GROUP PLAY ─────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === 'groupPlay') {
    // ── Menu ────────────────────────────────────────────────────────────────
    if (grpScreen === 'menu') return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setScreen('home')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
          </div>
          <div className="fu" style={{textAlign:'center',paddingBottom:24}}>
            <div style={{fontSize:48}}>👥</div>
            <h1 style={{...S.h1,marginTop:8}}>{t.groupPlay}</h1>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <button className="fu" onClick={()=>{ setGrpScreen('hostSetup'); setGrpErr(''); }} style={S.pBtn({padding:'18px',fontSize:16,animationDelay:'0.1s'})}>
              🎮 {t.hostGame}
            </button>
            <button className="fu" onClick={()=>{ setGrpScreen('joinSetup'); setGrpErr(''); }} style={S.sBtn({padding:'18px',fontSize:16,animationDelay:'0.15s'})}>
              🚪 {t.joinGame}
            </button>
          </div>
        </div>
      </div>
    );

    // ── Host setup ───────────────────────────────────────────────────────────
    if (grpScreen === 'hostSetup') return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setGrpScreen('menu')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
          </div>
          <h2 className="fu" style={{...S.h2,marginBottom:20}}>🎮 {t.hostGame}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <input value={grpName} onChange={e=>setGrpName(e.target.value)} placeholder={t.yourName} style={S.input()} />
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontSize:13,color:muted,fontWeight:600}}>{t.selectSectionFirst}</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {SECTIONS.map(sec=>(
                  <button key={sec.id} onClick={()=>setGrpSection(sec.id)}
                    style={{padding:'10px 16px',borderRadius:10,fontWeight:700,fontSize:14,cursor:'pointer',
                      background:grpSection===sec.id?`linear-gradient(135deg,${GOLD},${DARK_GOLD})`:'transparent',
                      color:grpSection===sec.id?'#1a1a2e':fg,
                      border:`1px solid ${grpSection===sec.id?GOLD:cardBorder}`}}>
                    {sec.id}
                  </button>
                ))}
              </div>
            </div>
            {grpErr && <p style={{color:RED,fontSize:13}}>{grpErr}</p>}
            <button onClick={createGame} style={S.pBtn({marginTop:8,padding:'15px'})} className="glow">
              {t.createGame}
            </button>
          </div>
        </div>
      </div>
    );

    // ── Host lobby ───────────────────────────────────────────────────────────
    if (grpScreen === 'hostLobby') return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{paddingTop:24,textAlign:'center'}} className="fu">
            <p style={{color:muted,fontSize:13,marginBottom:8}}>{t.yourCode}</p>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:800,color:GOLD,letterSpacing:8}}>
              {grpCode}
            </div>
            <button onClick={()=>{ navigator.clipboard?.writeText(grpCode); setCodeCopied(true); setTimeout(()=>setCodeCopied(false),2000); }}
              style={{...S.sBtn({width:'auto',padding:'8px 16px',fontSize:12,marginTop:10})}}>
              {codeCopied ? t.codeCopied : t.copyCode}
            </button>
          </div>
          <div style={{...S.card({marginTop:24,marginBottom:16})}}>
            <p style={{fontWeight:700,marginBottom:10}}>{t.players} ({grpState?.players?.length||0})</p>
            {(grpState?.players||[]).map((p,i)=>(
              <div key={i} style={{padding:'8px 0',borderBottom:i<(grpState.players.length-1)?`1px solid ${cardBorder}`:'none',fontSize:14}}>
                {i===0?'👑 ':'👤 '}{p.name}
              </div>
            ))}
          </div>
          <p style={{color:muted,fontSize:13,textAlign:'center',marginBottom:16}}>{t.waitingForPlayers}</p>
          <button onClick={hostStart} style={S.pBtn({padding:'16px'})} className="glow">
            ▶ {t.startGame}
          </button>
        </div>
      </div>
    );

    // ── Host game ────────────────────────────────────────────────────────────
    if (grpScreen === 'hostGame') {
      const gq = grpState?.questions?.[hostIdx];
      const ended = grpState?.status === 'ended';
      return (
        <div style={S.wrap}>
          <div style={S.inner}>
            {ended ? (
              <div style={{textAlign:'center',paddingTop:48}} className="fu">
                <div style={{fontSize:52}}>🏁</div>
                <h2 style={{...S.h2,marginTop:12,marginBottom:8}}>Game Over!</h2>
                <p style={{color:muted,marginBottom:24}}>Code: <strong style={{color:GOLD}}>{grpCode}</strong></p>
                <div style={S.card({marginBottom:20})}>
                  {(grpState?.players||[]).map((p,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',
                      borderBottom:i<grpState.players.length-1?`1px solid ${cardBorder}`:'none'}}>
                      <span>{['🥇','🥈','🥉'][i]||`${i+1}.`} {p.name}</span>
                      <span style={{fontWeight:700,color:GOLD}}>{p.score||0}</span>
                    </div>
                  ))}
                </div>
                <button onClick={()=>{ if(pollRef.current)clearInterval(pollRef.current); setScreen('home'); }} style={S.pBtn()}>
                  🏠 {t.home}
                </button>
              </div>
            ) : gq ? (
              <div style={{paddingTop:20}}>
                <div style={{...S.row(),justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <span style={{color:GOLD,fontWeight:700}}>Q{hostIdx+1}/{grpState?.questions?.length}</span>
                  <span style={S.badge(GOLD,`${GOLD}22`)}>👥 {grpState?.players?.length}</span>
                </div>
                <div style={S.card({marginBottom:14,padding:'18px'})}>
                  <p style={{fontSize:16,fontWeight:600,lineHeight:1.6}}>{gq[lang]?.q}</p>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
                  {gq[lang]?.options
                    ? gq[lang].options.map((op,i)=>(
                        <div key={i} style={{...S.card({padding:'12px 14px',
                          border:`2px solid ${i===gq[lang].answer?GREEN:cardBorder}`}),
                          color:i===gq[lang].answer?GREEN:fg,fontWeight:i===gq[lang].answer?700:400,fontSize:14}}>
                          {op}
                        </div>
                      ))
                    : [true,false].map((v,i)=>(
                        <div key={i} style={{...S.card({padding:'16px',textAlign:'center',
                          border:`2px solid ${v===gq[lang].answer?GREEN:cardBorder}`}),
                          color:v===gq[lang].answer?GREEN:fg,fontWeight:700,fontSize:16}}>
                          {v ? t.true : t.false}
                        </div>
                      ))
                  }
                </div>
                <button onClick={hostNext} style={S.pBtn({padding:'14px'})}>
                  {hostIdx+1 < (grpState?.questions?.length||0) ? '→ Next Question' : '🏁 End Game'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    // ── Join setup ───────────────────────────────────────────────────────────
    if (grpScreen === 'joinSetup') return (
      <div style={S.wrap}>
        <div style={S.inner}>
          <div style={{...S.row(),alignItems:'center',paddingTop:16,marginBottom:20}}>
            <button onClick={()=>setGrpScreen('menu')} style={S.sBtn({width:'auto',padding:'10px 16px'})}>← {t.back}</button>
          </div>
          <h2 className="fu" style={{...S.h2,marginBottom:20}}>🚪 {t.joinGame}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <input value={grpName} onChange={e=>setGrpName(e.target.value)} placeholder={t.yourName} style={S.input()} />
            <input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} placeholder={t.enterCode}
              style={S.input({letterSpacing:4,fontWeight:700,fontSize:16,textAlign:'center'})} maxLength={6} />
            {grpErr && <p style={{color:RED,fontSize:13}}>{grpErr}</p>}
            <button onClick={joinGame} style={S.pBtn({marginTop:8,padding:'15px'})} className="glow">
              {t.joinLobby}
            </button>
          </div>
        </div>
      </div>
    );

    // ── Join lobby ───────────────────────────────────────────────────────────
    if (grpScreen === 'joinLobby') {
      if (grpState?.status === 'playing') {
        // Auto-transition to player game
        return (
          <div style={S.wrap}>
            <div style={S.inner}>
              <PlayerGameView
                grpState={grpState} lang={lang} t={t} grpAns={grpAns}
                playerAnswer={playerAnswer} S={S} cardBorder={cardBorder}
                fg={fg} muted={muted} GOLD={GOLD} GREEN={GREEN} RED={RED}
                grpCode={grpCode} pollRef={pollRef} setScreen={setScreen}
              />
            </div>
          </div>
        );
      }
      return (
        <div style={S.wrap}>
          <div style={S.inner}>
            <div style={{textAlign:'center',paddingTop:48}} className="fu">
              <div style={{fontSize:48}}>⏳</div>
              <h2 style={{...S.h2,marginTop:12}}>{t.waitingForHost}</h2>
              <p style={{color:muted,marginTop:8,fontSize:13}}>Code: <strong style={{color:GOLD}}>{grpCode}</strong></p>
            </div>
            <div style={S.card({marginTop:24})}>
              <p style={{fontWeight:700,marginBottom:10}}>{t.players}</p>
              {(grpState?.players||[]).map((p,i)=>(
                <div key={i} style={{padding:'8px 0',fontSize:14,borderBottom:i<(grpState.players.length-1)?`1px solid ${cardBorder}`:'none'}}>
                  {i===0?'👑 ':'👤 '}{p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
}

// ─── PLAYER GAME VIEW ─────────────────────────────────────────────────────────
function PlayerGameView({ grpState, lang, t, grpAns, playerAnswer, S, cardBorder, fg, muted, GOLD, GREEN, RED, grpCode, pollRef, setScreen }) {
  if (grpState?.status === 'ended') {
    return (
      <div style={{textAlign:'center',paddingTop:48}}>
        <div style={{fontSize:52}}>🏁</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,marginTop:12,marginBottom:8}}>Game Over!</h2>
        <button onClick={()=>{ if(pollRef.current)clearInterval(pollRef.current); setScreen('home'); }}
          style={{background:`linear-gradient(135deg,${GOLD},#b8941f)`,color:'#1a1a2e',fontWeight:700,fontSize:15,padding:'14px 20px',borderRadius:12,width:'100%',border:'none',cursor:'pointer',marginTop:16}}>
          🏠 {t.home}
        </button>
      </div>
    );
  }
  const q = grpState?.questions?.[grpState?.currentQuestion];
  if (!q) return <div style={{textAlign:'center',color:muted,paddingTop:48}}>{t.waitingForHost}</div>;
  const qd = q[lang];
  return (
    <div style={{paddingTop:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <span style={{color:GOLD,fontWeight:700}}>Q{(grpState.currentQuestion||0)+1}</span>
        {grpAns !== null && <span style={{color:GREEN,fontWeight:700,fontSize:13}}>✓ Answered</span>}
      </div>
      <div style={{background:'rgba(255,255,255,0.045)',border:`1px solid rgba(255,255,255,0.09)`,borderRadius:14,padding:'18px',marginBottom:14}}>
        <p style={{fontSize:15,fontWeight:600,lineHeight:1.65,color:fg}}>{qd?.q}</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {qd?.options
          ? qd.options.map((op,i)=>{
              const picked = grpAns === i;
              return (
                <button key={i} disabled={grpAns!==null}
                  style={{background:picked?`${GREEN}22`:'rgba(255,255,255,0.045)',
                    border:`2px solid ${picked?GREEN:'rgba(255,255,255,0.09)'}`,
                    borderRadius:12,padding:'14px 16px',textAlign:'left',color:picked?GREEN:fg,
                    fontWeight:picked?700:400,fontSize:14,cursor:grpAns!==null?'default':'pointer'}}
                  onClick={()=>playerAnswer(i)}>
                  {op}
                </button>
              );
            })
          : [true,false].map((v,i)=>{
              const picked = grpAns === v;
              return (
                <button key={i} disabled={grpAns!==null}
                  style={{background:picked?`${GREEN}22`:'rgba(255,255,255,0.045)',
                    border:`2px solid ${picked?GREEN:'rgba(255,255,255,0.09)'}`,
                    borderRadius:12,padding:'20px',textAlign:'center',color:picked?GREEN:fg,
                    fontWeight:700,fontSize:16,cursor:grpAns!==null?'default':'pointer'}}
                  onClick={()=>playerAnswer(v)}>
                  {v ? t.true : t.false}
                </button>
              );
            })
        }
      </div>
    </div>
  );
}
