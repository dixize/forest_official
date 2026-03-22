// Твои данные из "Ультра Теха" (Оставляем их)
const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

// БАЗА ДАННЫХ ЛЕСА (Вместо техники)
const DB = [
    // ФЛОРА
    { id: 1, cat: 'Flora', name: 'Древние Секвойи', desc: 'Самые высокие и древние деревья на планете. Узнайте, как мы спасаем их от вырубки.', icon: 'fa-tree', grad: 'from-[#0a1c10] to-black' },
    { id: 2, cat: 'Flora', name: 'Мхи и Лишайники', desc: 'Индикаторы чистоты воздуха. Почему исчезновение мха ведет к гибели экосистемы.', icon: 'fa-leaf', grad: 'from-[#132a13] to-[#050a06]' },
    { id: 3, cat: 'Flora', name: 'Лекарственные Растения', desc: 'Природная аптека, которая уничтожается из-за изменения климата.', icon: 'fa-seedling', grad: 'from-[#0f2413] to-[#000]' },

    // ФАУНА
    { id: 10, cat: 'Fauna', name: 'Бурые Медведи', desc: 'Сохранение естественной среды обитания главных хищников тайги.', icon: 'fa-paw', grad: 'from-[#1a1410] to-black' },
    { id: 11, cat: 'Fauna', name: 'Лесные Птицы', desc: 'Программа поддержки популяции редких видов сов и дятлов.', icon: 'fa-dove', grad: 'from-[#101a1a] to-black' },
    { id: 12, cat: 'Fauna', name: 'Микромир', desc: 'Насекомые как фундамент лесной жизни. Роль муравьев в очистке леса.', icon: 'fa-bug', grad: 'from-[#1a1c10] to-black' },

    // ЭКОЛОГИЯ
    { id: 20, cat: 'Ecology', name: 'Углеродный След', desc: 'Как один гектар леса компенсирует выбросы целого завода.', icon: 'fa-smog', grad: 'from-[#1c1c1c] to-black' },
    { id: 21, cat: 'Ecology', name: 'Очистка Рек', desc: 'Связь лесных массивов и чистоты подземных источников воды.', icon: 'fa-water', grad: 'from-[#0a1a24] to-black' },

    // КАК ПОМОЧЬ (ИНИЦИАТИВЫ)
    { id: 30, cat: 'Help', name: 'Посади Дерево', desc: 'Участвуйте в нашей весенней кампании по восстановлению лесов.', icon: 'fa-hand-holding-hand', grad: 'from-[#1a331a] to-black' },
    { id: 31, cat: 'Help', name: 'Волонтерство', desc: 'Присоединяйтесь к лагерям по уборке лесных территорий.', icon: 'fa-people-group', grad: 'from-[#24331a] to-black' }
];

// НАВИГАЦИЯ
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => {
        p.classList.remove('active');
        p.classList.remove('block-mode');
    });
    
    const target = document.getElementById('page-' + pageId);
    if(target) {
        if(pageId === 'home') target.classList.add('active');
        else target.classList.add('active', 'block-mode');
    }
    
    // Если перешли в меню, по умолчанию показываем Флору
    if(pageId === 'menu') renderItems('Flora');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// РЕНДЕР КАРТОЧЕК
function renderItems(category) {
    const list = document.getElementById('items-list');
    
    // Подсветка активной категории
    document.querySelectorAll('.cat-card').forEach(card => {
        card.classList.remove('active-cat');
        if(card.innerText.includes(
            category === 'Flora' ? 'ФЛОРА' : 
            category === 'Fauna' ? 'ФАУНА' : 
            category === 'Ecology' ? 'ЭКОЛОГИЯ' : 'КАК ПОМОЧЬ'
        )) {
            card.classList.add('active-cat');
        }
    });

    const filtered = DB.filter(p => p.cat === category);
    list.innerHTML = filtered.map(p => `
        <div class="bg-gradient-to-br ${p.grad} rounded-[32px] p-8 border border-[#142e17] hover:border-[#2e6b35] transition-all duration-500 group cursor-pointer" onclick="viewDetail(${p.id})">
            <div class="w-16 h-16 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-[#1a331a] transition-colors">
                <i class="fa-solid ${p.icon} text-2xl text-[#4b7a50] group-hover:text-[#4ade80]"></i>
            </div>
            <h3 class="font-serif text-2xl font-bold mb-3 text-green-50">${p.name}</h3>
            <p class="text-green-800 text-sm line-clamp-3 leading-relaxed font-medium">${p.desc}</p>
            <div class="mt-8 flex justify-end">
                <div class="w-10 h-10 rounded-full border border-[#142e17] flex items-center justify-center group-hover:border-[#4ade80] group-hover:bg-[#4ade80] group-hover:text-black transition-all">
                    <i class="fa-solid fa-arrow-right text-sm"></i>
                </div>
            </div>
        </div>
    `).join('');
}

// ПРОСМОТР ДЕТАЛЕЙ (ИНФО-СТРАНИЦА)
function viewDetail(id) {
    const p = DB.find(x => x.id === id);
    const container = document.getElementById('detail-container');
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <button onclick="showPage('menu')" class="mb-10 text-green-700 text-[10px] font-black uppercase tracking-[3px] hover:text-green-400 transition flex items-center gap-2">
                <i class="fa-solid fa-chevron-left"></i> Назад к списку
            </button>
            <div class="bg-gradient-to-b ${p.grad} rounded-[40px] p-8 md:p-16 border border-[#142e17] shadow-2xl relative overflow-hidden">
                <i class="fa-solid ${p.icon} absolute -right-10 -bottom-10 text-[250px] text-white/5 opacity-20 pointer-events-none"></i>
                
                <div class="relative z-10">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black border border-green-900 mb-8">
                        <i class="fa-solid ${p.icon} text-3xl text-[#4ade80]"></i>
                    </div>
                    <div class="text-green-500 font-bold text-xs mb-4 tracking-[0.3em] uppercase">${p.cat}</div>
                    <h2 class="text-5xl md:text-6xl font-serif font-black mb-8 tracking-tighter text-green-50">${p.name}</h2>
                    <div class="w-20 h-1 bg-green-900 mb-8"></div>
                    <p class="text-green-100/70 text-lg leading-relaxed mb-12 max-w-2xl">${p.desc} Природа — это дом, который мы должны беречь. Наш проект направлен на сохранение биоразнообразия и восстановление естественного баланса планеты.</p>
                    
                    <button onclick="openContactModal()" class="bg-[#1a331a] border border-[#2e6b35] text-green-100 px-8 py-4 rounded-full font-bold hover:bg-[#4ade80] hover:text-black transition-colors uppercase tracking-widest text-xs">
                        Присоединиться к инициативе
                    </button>
                </div>
            </div>
        </div>
    `;
    showPage('detail');
}

// МОДАЛЬНОЕ ОКНО И ОТПРАВКА В TELEGRAM
function openContactModal() {
    document.getElementById('contact-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contact-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

async function sendTelegramMessage() {
    const name = document.getElementById('tg-name').value.trim();
    const phone = document.getElementById('tg-phone').value.trim();
    const message = document.getElementById('tg-message').value.trim();
    
    if(!name || !phone) return alert('Пожалуйста, укажите имя и телефон для связи.');
    
    const btn = event.target; 
    const originalText = btn.innerText;
    btn.disabled = true; 
    btn.innerText = 'ОТПРАВКА...';
    
    let msg = `🌲 **НОВОЕ ОБРАЩЕНИЕ (FOREST)**%0A%0A`;
    msg += `👤 **Имя:** ${name}%0A`;
    msg += `📞 **Тел:** ${phone}%0A`;
    if(message) msg += `💬 **Сообщение:** ${message}%0A`;
    
    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}&parse_mode=Markdown`);
        alert('Спасибо! Ваше обращение отправлено защитникам леса.');
        closeContactModal();
        document.getElementById('tg-name').value = '';
        document.getElementById('tg-phone').value = '';
        document.getElementById('tg-message').value = '';
    } catch(e) { 
        alert('Ошибка при отправке сообщения. Проверьте подключение.'); 
    } finally { 
        btn.disabled = false; 
        btn.innerText = originalText; 
    }
}
