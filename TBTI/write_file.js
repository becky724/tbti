const fs = require('fs');

const content = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TPTI 旅游人格测试</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
        * { font-family: 'Ma Shan Zheng', cursive; }
        body { margin: 0; min-height: 100vh; background: linear-gradient(180deg, #fdf8e8 0%, #f5ede0 100%); }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .progress-fill { transition: width 0.5s ease; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState } = React;
        const colors = ['#e8a8b0', '#9cb89a', '#c9b896', '#a8c8d8', '#b8a8d8', '#d8c898', '#c8d8a8', '#e8c8a8'];
        
        const questions = [
            { text: '当你准备长途旅行时，行程表通常是：', options: [
                { text: '精确到小时的详细安排', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '有主要景点清单，顺序视心情', scores: { P: 2, S: 0, A: 0, D: 0 } },
                { text: '只订好往返机票和首晚酒店', scores: { P: 1, S: 0, A: 0, D: 0 } },
                { text: '从不做计划，随波逐流', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '发现未计划的小众景点，你会：', options: [
                { text: '担心打乱行程，犹豫不决', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '时间允许就进去探索', scores: { P: 1, S: 0, A: 1, D: 0 } },
                { text: '立刻进去，计划就是用来打破的', scores: { P: 0, S: 0, A: 2, D: 0 } },
                { text: '无所谓，看缘分', scores: { P: 0, S: 0, A: 1, D: 1 } }
            ]},
            { text: '航班延误5小时，你会：', options: [
                { text: '立刻改签，重新规划路线', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '抱怨后去免税店或咖啡馆', scores: { P: 0, S: 1, A: 0, D: 1 } },
                { text: '觉得是天意，观察周围的人', scores: { P: 0, S: 2, A: 1, D: 2 } },
                { text: '找角落睡觉，谁也不理', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '旅途中如何与陌生人互动？', options: [
                { text: '主动结识，加入家庭聚会', scores: { P: 0, S: 3, A: 0, D: 0 } },
                { text: '与导游聊天获取信息', scores: { P: 0, S: 2, A: 0, D: 0 } },
                { text: '观察陌生人，偶尔深度讨论', scores: { P: 0, S: 1, A: 0, D: 3 } },
                { text: '避免眼神接触，享受独处', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '朋友邀请参加大型狂欢节，你会：', options: [
                { text: '太棒了！要成为派对焦点', scores: { P: 0, S: 3, A: 1, D: 0 } },
                { text: '不影响行程就去体验', scores: { P: 1, S: 2, A: 0, D: 0 } },
                { text: '文化类庆典去，喧闹的拒绝', scores: { P: 0, S: 1, A: 0, D: 2 } },
                { text: '人太多太吵，宁愿看书', scores: { P: 0, S: 0, A: 0, D: 1 } }
            ]},
            { text: '网红打卡点和冷门遗迹选哪个？', options: [
                { text: '两个都要，打卡加拍照', scores: { P: 0, S: 2, A: 0, D: 1 } },
                { text: '当然是网红点', scores: { P: 0, S: 3, A: 0, D: 0 } },
                { text: '直接去遗迹，在乎历史厚度', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '看哪个近或心情', scores: { P: 0, S: 0, A: 1, D: 0 } }
            ]},
            { text: '旅行最有价值的部分是：', options: [
                { text: '挑战自我极限', scores: { P: 0, S: 0, A: 3, D: 0 } },
                { text: '品尝当地美食', scores: { P: 0, S: 2, A: 0, D: 0 } },
                { text: '了解历史文化风土人情', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '彻底放松，忘掉工作', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '旅行拍照风格是：', options: [
                { text: '精心摆拍修图两小时', scores: { P: 0, S: 3, A: 0, D: 0 } },
                { text: '记录风景美食，不追求完美', scores: { P: 0, S: 2, A: 0, D: 0 } },
                { text: '拍摄细节光影人文瞬间', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '很少拍照，用眼睛看', scores: { P: 0, S: 0, A: 0, D: 2 } }
            ]},
            { text: '预算翻倍，优先增加哪方面支出？', options: [
                { text: '升级住宿和交通', scores: { P: 2, S: 0, A: 0, D: 0 } },
                { text: '增加购物娱乐', scores: { P: 0, S: 2, A: 0, D: 0 } },
                { text: '去更偏远探险目的地', scores: { P: 0, S: 0, A: 3, D: 0 } },
                { text: '聘请私人导游讲解', scores: { P: 0, S: 0, A: 0, D: 3 } }
            ]},
            { text: '旅伴想改变行程，你会：', options: [
                { text: '坚决拒绝，计划完美', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '理由充分可调整', scores: { P: 2, S: 0, A: 0, D: 0 } },
                { text: '没问题，听你的', scores: { P: 0, S: 1, A: 2, D: 0 } },
                { text: '无所谓', scores: { P: 0, S: 0, A: 1, D: 1 } }
            ]},
            { text: '更喜欢和什么样的人旅行？', options: [
                { text: '执行力强效率高的伙伴', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '热情开朗能带动气氛', scores: { P: 0, S: 3, A: 0, D: 0 } },
                { text: '见多识广有思想深度', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '独自一人', scores: { P: 0, S: 0, A: 1, D: 1 } }
            ]},
            { text: '你对荒野的看法是：', options: [
                { text: '危险不可控，尽量避免', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '安全到位愿意体验', scores: { P: 1, S: 0, A: 2, D: 0 } },
                { text: '荒野是灵魂归宿', scores: { P: 0, S: 0, A: 3, D: 2 } },
                { text: '有Wi-Fi和帐篷可以接受', scores: { P: 0, S: 0, A: 0, D: 1 } }
            ]},
            { text: '面对全新国家的第一反应：', options: [
                { text: '查资料评估安全性', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '太酷了！要去探险', scores: { P: 0, S: 0, A: 3, D: 0 } },
                { text: '想知道历史文化背景', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '麻烦，去熟悉的地方', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '博物馆会花多少时间？', options: [
                { text: '快速打卡30分钟', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '随意逛1-2小时', scores: { P: 1, S: 0, A: 0, D: 1 } },
                { text: '花一整天研读标签', scores: { P: 0, S: 0, A: 0, D: 3 } },
                { text: '不会进去，太闷', scores: { P: 0, S: 0, A: 1, D: 0 } }
            ]},
            { text: '有人推荐野路更快到山顶：', options: [
                { text: '绝对不走，安全第一', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '询问路况后谨慎尝试', scores: { P: 1, S: 0, A: 1, D: 0 } },
                { text: '拉同伴走小路更刺激', scores: { P: 0, S: 1, A: 3, D: 0 } },
                { text: '让同伴探路，我等', scores: { P: 0, S: 0, A: 0, D: 0 } }
            ]},
            { text: '完美旅行最大的收获：', options: [
                { text: '相册和朋友圈点赞', scores: { P: 0, S: 3, A: 0, D: 0 } },
                { text: '完成计划有成就感', scores: { P: 3, S: 0, A: 0, D: 0 } },
                { text: '挑战自我突破极限', scores: { P: 0, S: 0, A: 3, D: 0 } },
                { text: '内心平静，新认知', scores: { P: 0, S: 0, A: 0, D: 3 } }
            ]}
        ];

        const personalities = {
            '团魂发动机': { 
                tags: ['团队组织者', '定海神针'], 
                desc: '你天生具备领导力与亲和力，总能在旅途中成为那个"定海神针"般的人物。你的旅行不仅是看风景，更是编织关系的网。你善于在群体中找到自己的位置并发挥价值。你用热情感染他人，用条理保障安全，是朋友们最信赖的"旅行管家"。你的存在，让旅途充满了欢声笑语与有序的美好。', 
                behaviors: ['提前数月规划行程，预订所有票务和住宿', '旅行中每天在朋友圈分享九宫格打卡照', '主动组织团队活动，确保每个人都能参与', '重视旅行的"性价比"和"效率"，不喜欢浪费时间'], 
                interests: ['城市地标', '网红打卡点', '团队互动体验', '标准化服务'], 
                destinations: '北京、上海、东京等交通高效、景点密集的城市，适合打卡式城市漫游', 
                partners: '自由浪人（INFP、INFJ、INTP）、沉浸式旅行诗人（ENFJ、ENFP）', 
                color: '#e8a8b0' 
            },
            '野生玩家': { 
                tags: ['派对灵魂', '随性热情'], 
                desc: '你像一阵自由的风，吹过城市的街头巷尾，总能卷入最热闹的人群。你对世界充满好奇，善于在流动的盛宴中捕捉快乐的瞬间。你践行着"自我实现"的旅途，追求当下的满足与高峰体验。你不拘小节，随遇而安，每一次偶遇在你看来都是命运的馈赠。和你在一起，生活永远充满惊喜。', 
                behaviors: ['临时起意订机票和住宿', '到达目的地后才开始规划行程', '喜欢与当地人和陌生游客互动', '注重旅行中的情感体验和社交乐趣'], 
                interests: ['街头文化', '当地美食', '社交活动', '夜生活'], 
                destinations: '泰国清迈、西班牙巴塞罗那等充满活力和社交氛围的城市', 
                partners: '流量种草王（ESFP、ESTP）、荒野漫游家（ENFP、ENFJ）', 
                color: '#d8c898' 
            },
            '流量种草王': { 
                tags: ['流量宠儿', '快乐分享'], 
                desc: '你拥有一双发现美的眼睛，热衷于将生活的高光时刻定格。你的旅行是对美好生活的热烈向往，通过分享，你不仅记录了自己的足迹，也为他人点亮了向往的灯塔。你擅长从外部反馈中获得正向激励，构建属于自己的快乐宇宙。你活在当下，也活在聚光灯下，尽情享受这份纯粹的快乐吧。', 
                behaviors: ['提前搜索网红打卡点攻略并逐一打卡', '每天在社交媒体发布大量旅行内容', '喜欢结伴旅行，分享旅行体验', '追求视觉冲击力强的景点和体验'], 
                interests: ['网红景点', '特色美食', '夜生活', '社交互动'], 
                destinations: '重庆洪崖洞、上海外滩、泰国芭提雅等网红景点集中且社交氛围浓厚的城市', 
                partners: '团魂发动机（ESTJ、ESFJ、ENTJ）、野生玩家（ESFP、ESTP、ENFP）', 
                color: '#e8c8a8' 
            },
            '行程卷王': { 
                tags: ['理性学者', '高效深度'], 
                desc: '你用逻辑搭建通往远方的桥梁，每一步都走得踏实而笃定。你的旅行是一场精心策划的知识探险，你相信充分的准备是对旅程最大的尊重。你通过预先构建详尽的认知，来降低未知带来的焦虑，从而在旅途中获得掌控感与安全感。你的严谨不是束缚，而是为了让灵魂在熟悉的节奏中更好地吸收世界的养分。', 
                behaviors: ['制作详细的行程表和备选方案', '提前研究所有景点的历史背景和游览价值', '选择交通便利、设施完善的目的地', '重视行程的可控性，不喜欢意外变化'], 
                interests: ['历史文化', '建筑艺术', '高效交通', '安全设施'], 
                destinations: '德国慕尼黑、瑞士卢塞恩等交通系统完善、历史底蕴深厚的目的地', 
                partners: '林间修行侠（ISFJ、ISTJ）、思想旅人（INFJ、INFP）', 
                color: '#a8c8d8' 
            },
            '安全叠甲师': { 
                tags: ['安全化身', '秩序守护者'], 
                desc: '在这个充满变数的世界里，你选择用规则为自己筑起一座温暖的堡垒。你的旅行不是为了冒险，而是为了在熟悉的秩序中获得片刻的休憩。这种对秩序的执着往往源于内心对"容器"的需求——一个安全、稳定的心理空间。你深知自己的边界在哪里，并温柔地守护着它。这种自我认知与自我保护，本身就是一种深沉的智慧与自爱。', 
                behaviors: ['注重旅行中的舒适度和便利性', '偏好设施完善、服务标准化的目的地', '追求平静的旅行体验', '重视旅行中的安全感和可预测性'], 
                interests: ['舒适住宿', '便利交通', '熟悉环境', '安全设施'], 
                destinations: '标准化度假村、温泉胜地、文化名城等设施完善且相对安全的目的地', 
                partners: '躺平老鼠人（ISFJ、ISTJ）、行程卷王（ISTJ、INTJ）', 
                color: '#b8a8d8' 
            },
            '荒野漫游家': { 
                tags: ['自由不羁', '精神流浪'], 
                desc: '你的心中有一片无垠的旷野，呼唤你挣脱束缚，去探索世界的边界。你的旅行是一场寻找自我的流浪，你相信答案在路上，而非在起点。你拒绝被定义，通过不断的探索来确认自己的存在。你的每一次出发，都是一次对生命可能性的深情叩问。', 
                behaviors: ['喜欢尝试新路线和活动', '注重旅行中的惊喜和未知', '喜欢与当地人互动，获取最新信息', '重视旅行中的成长和变化'], 
                interests: ['自然探险', '文化体验', '社交互动', '新奇事物'], 
                destinations: '云南雨崩村、新疆夏塔古道、贵州荔波樟江等自然风光优美且适合自由探索的区域', 
                partners: '野生玩家（ESFP、ESTP、ENFP）、林间修行侠（ISFJ、ISTJ）', 
                color: '#9cb89a' 
            },
            '硬核玩家': { 
                tags: ['有准备的冒险家', '胆大心细'], 
                desc: '你兼具理性的头脑与无畏的勇气，是探险家中的智者。你深知"机会总是留给有准备的人"，因此你用周密的计划为冒险保驾护航。你相信通过自己的努力可以掌控局势。你不是鲁莽的赌徒，而是精明的猎手，在挑战与安全之间找到了完美的平衡点，每一次征服都是对自己能力的肯定。', 
                behaviors: ['提前规划冒险行程，但留有灵活空间', '注重冒险活动的安全性和可行性', '喜欢挑战自我的极限，但不喜欢盲目冒险', '重视旅行中的成就感和突破感'], 
                interests: ['结构化冒险', '有挑战性的户外活动', '安全设施完善的目的地'], 
                destinations: '四川四姑娘山、新西兰汤加里罗火山步道等设施完善但具有挑战性的徒步路线', 
                partners: '肾上腺素狂人（ENTP、ESTP）、行程卷王（ISTJ、INTJ）', 
                color: '#d8a8b8' 
            },
            '肾上腺素狂人': { 
                tags: ['刺激追求者', '为心跳而活'], 
                desc: '你用身体去丈量世界的极限，用肾上腺素来确认生命的鲜活。在你眼中，舒适区是最大的敌人，而挑战是灵魂的养料。"多巴胺机制"在你身上尤为显著，你从高风险、高刺激的活动中获得巨大的心理满足。你的每一次纵身一跃，都是对平庸生活最有力的反抗，你是生命的舞者，在悬崖边跳出最绚烂的舞步。', 
                behaviors: ['主动尝试未开发或小众路线', '喜欢极限运动和户外挑战', '追求与众不同的旅行体验', '重视旅行中的成就感和突破感'], 
                interests: ['户外运动', '极限挑战', '未开发区域', '冒险体验'], 
                destinations: '新西兰皇后镇、尼泊尔安纳普尔纳大环线、西藏珠峰大本营等适合冒险探索的目的地', 
                partners: '硬核玩家（ENTJ）、荒野漫游家（ENFP、ENFJ）', 
                color: '#e8b8a8' 
            },
            '自由浪人': { 
                tags: ['风一样自由', '无拘无束'], 
                desc: '你的灵魂向往辽阔的天地，厌恶被框架束缚。旅行于你，是挣脱世俗枷锁的流浪，是追寻生命本真的朝圣。存在主义心理学中的"自由选择"理论在你身上体现得淋漓尽致——你拒绝被定义，不被计划捆绑，不为社交妥协，只听从内心的呼唤。或许你曾见过太多按部就班的旅程，于是选择用最原始的方式与世界对话：在荒野中迷失，在海边发呆，与陌生人即兴交谈。这种看似"散漫"的背后，是对生命可能性的深情拥抱。你相信，真正的风景永远在计划之外，而真正的自我，永远在自由之中。心理学中的"自我实现"在此闪耀，你通过拥抱未知，完成对灵魂的滋养。你的旅行，是一场永不落幕的自我救赎，而世界，正是你放逐心灵的最佳归宿。', 
                behaviors: ['喜欢"迷路"，将意外发现视为旅行乐趣', '根据心情和直觉调整行程', '偏好自然景观和安静环境', '重视旅行中的反思和精神成长'], 
                interests: ['自然风光', '艺术氛围', '深度文化体验', '个人成长'], 
                destinations: '云南大理、日本京都、苏格兰爱丁堡等能提供精神滋养的目的地', 
                partners: '精神云端游民（INTJ、INFP）、思想旅人（INFJ、INFP）', 
                color: '#a8d8c8' 
            },
            '思想旅人': { 
                tags: ['文化追寻者', '深度思考'], 
                desc: '你用脚步丈量历史的厚度，用心灵倾听岁月的回响。你的旅行是一场跨越时空的对话，你不仅是看客，更是倾听者与思考者。那些遗迹与传说，唤醒了你内心深处沉睡的记忆。你用深邃的目光穿透表象，触摸到一个民族的灵魂，你的旅程是一场静默而丰盛的精神盛宴。', 
                behaviors: ['喜欢探访当地文化遗址和历史遗迹', '注重体验的真实性，不喜欢商业化过重的景点', '重视旅行中的思考和反思', '喜欢与当地人进行深度交流'], 
                interests: ['文化遗产', '历史故事', '地方文化', '艺术体验'], 
                destinations: '埃及埃德富神庙、意大利庞贝古城、中国敦煌莫高窟等文化内涵丰富的历史遗址', 
                partners: '精神云端游民（INTJ、INFP）、行程卷王（ISTJ、INTJ）', 
                color: '#c8a8d8' 
            },
            '精神云端游民': { 
                tags: ['孤独思想者', '自我对话'], 
                desc: '你选择在喧嚣之外，寻找一片属于自己的宁静角落。你的旅行不是为了逃离世界，而是为了更清晰地听见内心的声音。你享受孤独带来的自由，因为在独处时，你与自己的关系最为亲密。你用内省的方式与世界和解，你的每一次凝视，都是一次深刻的自我疗愈与精神回归。', 
                behaviors: ['注重旅行中的学习和思考', '喜欢深度研究目的地的文化和历史', '追求精神层面的满足', '重视旅行中的自我反思和成长'], 
                interests: ['历史文化', '艺术展览', '哲学思考', '自然景观'], 
                destinations: '英国约克郡、法国巴黎、日本京都等文化氛围浓厚且适合深度思考的目的地', 
                partners: '自由浪人（INFP、INFJ、INTP）、思想旅人（INFJ、INFP）', 
                color: '#d8d8a8' 
            },
            '躺平老鼠人': { 
                tags: ['治愈系', '享受当下'], 
                desc: '你或许背负了太多日常的重担，因此选择用最"节能"的方式来修复自己。你的旅行哲学是"存在"而非"作为"，只要我在那里，呼吸着那里的空气，我就已经完成了旅行。这其实是自我防御机制中的一种"退行"，通过回归到最原始、最放松的状态，来积蓄面对现实的能量。请允许自己这样静静地待着，这种"无所事事"的治愈力，正是你此刻最需要的温柔抚慰。', 
                behaviors: ['注重旅行中的独处和宁静', '喜欢在熟悉的环境中活动', '追求低强度的活动', '重视旅行中的内心平静和放松'], 
                interests: ['自然风光', '阅读写作', '冥想思考', '摄影创作'], 
                destinations: '乡村民宿、山林度假村、古镇等环境优美且相对安静的区域', 
                partners: '林间修行侠（ISFJ、ISTJ）、精神云端游民（INTJ、INFP）', 
                color: '#a8b8d8' 
            },
            '林间修行侠': { 
                tags: ['自然宠儿', '慢节奏治愈'], 
                desc: '你总能在山川湖海间找到内心的平静，旅行对你而言是一场身心的修行。你不追求走马观花的打卡，而是愿意花一下午时间观察一朵花的绽放、一条河的流淌。这种慢节奏的体验，让你从紧绷的日常中抽离，重新连接自然与自我。你的旅行没有KPI，只有"感受当下"的纯粹与自在。', 
                behaviors: ['喜欢在自然环境中慢节奏行走', '注重细节观察，如花草、建筑纹理等', '偏好清晨或傍晚的宁静时刻', '重视旅行中的内心平静和放松'], 
                interests: ['自然景观', '植物观察', '历史细节', '安静环境'], 
                destinations: '云南沙溪、浙江莫干山、日本轻井泽等自然风光优美且适合慢节奏旅行的目的地', 
                partners: '躺平老鼠人（ISFJ、ISTJ）、思想旅人（INFJ、INFP）', 
                color: '#b8d8a8' 
            },
            '沉浸式旅行诗人': { 
                tags: ['社交与深度', '文化社交双在线'], 
                desc: '你既能在人群中闪闪发光，又能在文化体验中沉淀自我。你擅长用社交为文化探索赋能，通过与不同的人交流，解锁目的地的多元视角。你的旅行是"有人情味的深度游"，既收获了真挚的情谊，又读懂了地方的灵魂，让每一次出发都兼具温度与厚度。', 
                behaviors: ['喜欢组织或参与团体文化活动', '注重与当地人的深度交流', '追求有文化内涵的社交体验', '重视旅行中的情感满足和人际关系'], 
                interests: ['文化体验', '社交活动', '历史故事', '美食分享'], 
                destinations: '法国普罗旺斯、意大利托斯卡纳、西班牙巴塞罗那等兼具文化深度和社交氛围的地区', 
                partners: '团魂发动机（ESTJ、ESFJ、ENTJ）、精神云端游民（INTJ、INFP）', 
                color: '#c8d8a8' 
            }
        };

        const calculateResult = (answers) => {
            let scores = { P: 0, S: 0, A: 0, D: 0 };
            answers.forEach((idx, qIdx) => {
                const opt = questions[qIdx].options[idx];
                Object.keys(opt.scores).forEach(k => scores[k] += opt.scores[k]);
            });
            const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
            const [primary, pScore] = sorted[0];
            const [secondary, sScore] = sorted[1];
            
            if (pScore <= 3 && sScore <= 3) return '躺平老鼠人';
            if (pScore <= 5 && sScore <= 5 && sorted[2][1] <= 4) return '林间修行侠';
            
            if (primary === 'S') {
                if (secondary === 'P' && sScore >= pScore - 3) return '团魂发动机';
                if (secondary === 'A' && sScore >= pScore - 3) return '野生玩家';
                if (secondary === 'D' && sScore >= pScore - 3) return '沉浸式旅行诗人';
                return '流量种草王';
            }
            if (primary === 'P') {
                if (secondary === 'S' && sScore >= pScore - 3) return '团魂发动机';
                if (secondary === 'D' && sScore >= pScore - 3) return '行程卷王';
                return '安全叠甲师';
            }
            if (primary === 'A') {
                if (secondary === 'S' && sScore >= pScore - 3) return '荒野漫游家';
                if (secondary === 'P' && sScore >= pScore - 3) return '硬核玩家';
                return '肾上腺素狂人';
            }
            if (primary === 'D') {
                if (secondary === 'A' && sScore >= pScore - 3) return '自由浪人';
                if (secondary === 'P' && sScore >= pScore - 3) return '思想旅人';
                if (secondary === 'S' && sScore >= pScore - 3) return '沉浸式旅行诗人';
                return '精神云端游民';
            }
            return '躺平老鼠人';
        };

        const StartPage = ({ onStart }) => {
            return (<div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 fade-in">
                <div className="max-w-[640px] w-full text-center">
                    <h1 className="text-4xl font-bold mb-4 text-[#e8a8b0]">TPTI</h1>
                    <h2 className="text-xl font-semibold text-[#8a7a6a] mb-6">旅游人格测试</h2>
                    <p className="text-[#7a6a5a] mb-8 leading-relaxed">欢迎来到TPTI！想象一下，你即将开启一次说走就走的旅行，以下问题将根据你的偏好和反应，揭示你的专属旅游型人格！请选择最符合你真实想法的选项，答案没有对错，只有真实又独特的你～</p>
                    <button className="px-12 py-4 text-xl font-bold rounded-lg bg-gradient-to-br from-[#e8a8b0] to-[#d99098] border-2 border-[#c97a82] shadow-[3px_3px_0_#c9b896] hover:translate-x-[-1px] hover:translate-y-[-1px]" onClick={onStart}>开始测试</button>
                </div>
            </div>);
        };

        const QuizPage = ({ currentQuestion, answers, onAnswer, onNext }) => {
            const question = questions[currentQuestion];
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            const hasSelected = answers[currentQuestion] !== undefined;
            const color = colors[currentQuestion % colors.length];
            
            return (<div className="min-h-screen flex flex-col items-center justify-between px-4 py-4 max-w-[640px] mx-auto w-full fade-in">
                <div className="w-full">
                    <div className="h-4 bg-[#f5ebe0] rounded-full overflow-hidden">
                        <div className="h-full progress-fill" style={{width: progress + '%', backgroundColor: color}}></div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-6 w-full mt-8 mb-16">
                    <h2 className="text-3xl text-center text-[#5c4d42] leading-relaxed">{question.text}</h2>
                    
                    <div className="flex flex-col items-center gap-3 w-full">
                        {question.options.map((opt, idx) => (
                            <button 
                                key={idx} 
                                className="w-full min-h-[52px] px-5 py-4 rounded-xl border-2 bg-[#fdf8e8] flex items-center gap-4 transition-all"
                                style={{borderColor: answers[currentQuestion] === idx ? color : '#d4c4a8'}}
                                onClick={() => onAnswer(idx)}
                            >
                                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{backgroundColor: answers[currentQuestion] === idx ? color : '#f5ebe0', color: answers[currentQuestion] === idx ? 'white' : '#8a7a6a'}}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="flex-1 text-left text-[#5c4d42] text-base">{opt.text}</span>
                                {answers[currentQuestion] === idx && <span style={{color: color}} className="text-xl">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="w-full">
                    <button 
                        className="w-full py-4 text-lg font-bold rounded-lg disabled:opacity-50 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        style={{backgroundColor: color}}
                        onClick={onNext} 
                        disabled={!hasSelected}
                    >
                        {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
                    </button>
                </div>
            </div>);
        };

        const PersonalityIllustration = ({ personality }) => {
            const illustrations = {
                '团魂发动机': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#ffeef0" stroke="#e8a8b0" strokeWidth="2"/>
                    <circle cx="60" cy="50" r="25" fill="#fff8e8" stroke="#e8a8b0" strokeWidth="1.5"/>
                    <circle cx="52" cy="45" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="45" r="4" fill="#5c4d42"/>
                    <path d="M55 58 Q60 63 65 58" stroke="#e8a8b0" strokeWidth="2" fill="none"/>
                    <rect x="35" y="75" width="50" height="35" rx="8" fill="#fff8e8" stroke="#e8a8b0" strokeWidth="1.5"/>
                    <circle cx="45" cy="85" r="6" fill="#e8a8b0"/>
                    <circle cx="55" cy="85" r="4" fill="#9cb89a"/>
                    <circle cx="65" cy="85" r="5" fill="#c9b896"/>
                    <circle cx="75" cy="85" r="4" fill="#a8c8d8"/>
                </svg>),
                '野生玩家': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#fff8f0" stroke="#d8c898" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="22" fill="#fff8e8" stroke="#d8c898" strokeWidth="1.5"/>
                    <circle cx="52" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M52 55 Q60 65 68 55" stroke="#d8c898" strokeWidth="3" fill="none"/>
                    <ellipse cx="60" cy="85" rx="20" ry="25" fill="#fff8e8" stroke="#d8c898" strokeWidth="1.5"/>
                    <polygon points="40,75 45,95 35,95" fill="#d8c898"/>
                    <polygon points="80,75 75,95 85,95" fill="#d8c898"/>
                    <circle cx="35" cy="30" r="6" fill="#e8a8b0" opacity="0.7"/>
                    <circle cx="85" cy="35" r="5" fill="#9cb89a" opacity="0.7"/>
                </svg>),
                '流量种草王': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#fff4eb" stroke="#e8c8a8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="24" fill="#fff8e8" stroke="#e8c8a8" strokeWidth="1.5"/>
                    <circle cx="50" cy="42" r="5" fill="#5c4d42"/>
                    <circle cx="70" cy="42" r="5" fill="#5c4d42"/>
                    <path d="M55 56 Q60 62 65 56" stroke="#e8a8b0" strokeWidth="2" fill="none"/>
                    <rect x="45" y="70" width="30" height="35" rx="5" fill="#fff8e8" stroke="#e8c8a8" strokeWidth="1.5"/>
                    <rect x="50" y="75" width="20" height="18" rx="3" fill="#f0f7f0"/>
                    <circle cx="60" cy="95" r="4" fill="#9cb89a"/>
                    <rect x="55" y="35" width="10" height="15" rx="2" fill="#e8c8a8"/>
                    <circle cx="60" cy="30" r="3" fill="#e8a8b0"/>
                </svg>),
                '行程卷王': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f0f6f8" stroke="#a8c8d8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="22" fill="#fff8e8" stroke="#a8c8d8" strokeWidth="1.5"/>
                    <circle cx="52" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M54 55 Q60 59 66 55" stroke="#a8c8d8" strokeWidth="2" fill="none"/>
                    <rect x="35" y="72" width="50" height="38" rx="8" fill="#fff8e8" stroke="#a8c8d8" strokeWidth="1.5"/>
                    <line x1="42" y1="82" x2="83" y2="82" stroke="#a8c8d8" strokeWidth="1"/>
                    <line x1="42" y1="90" x2="75" y2="90" stroke="#a8c8d8" strokeWidth="1"/>
                    <line x1="42" y1="98" x2="83" y2="98" stroke="#a8c8d8" strokeWidth="1"/>
                    <circle cx="45" cy="82" r="3" fill="#a8c8d8"/>
                </svg>),
                '安全叠甲师': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f4f0fe" stroke="#b8a8d8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="24" fill="#fff8e8" stroke="#b8a8d8" strokeWidth="1.5"/>
                    <circle cx="52" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M54 56 Q60 60 66 56" stroke="#b8a8d8" strokeWidth="2" fill="none"/>
                    <rect x="40" y="70" width="40" height="40" rx="10" fill="#fff8e8" stroke="#b8a8d8" strokeWidth="1.5"/>
                    <circle cx="60" cy="90" r="12" fill="#f4f0fe" stroke="#b8a8d8" strokeWidth="1.5"/>
                    <path d="M56 90 L60 86 L66 94" stroke="#b8a8d8" strokeWidth="2" fill="none"/>
                    <rect x="50" y="95" width="20" height="3" rx="1" fill="#b8a8d8"/>
                </svg>),
                '荒野漫游家': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f0f7f0" stroke="#9cb89a" strokeWidth="2"/>
                    <circle cx="60" cy="48" r="22" fill="#fff8e8" stroke="#9cb89a" strokeWidth="1.5"/>
                    <circle cx="52" cy="45" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="45" r="4" fill="#5c4d42"/>
                    <path d="M55 56 Q60 61 65 56" stroke="#9cb89a" strokeWidth="2" fill="none"/>
                    <path d="M40 75 Q60 100 80 75" fill="#fff8e8" stroke="#9cb89a" strokeWidth="1.5"/>
                    <circle cx="30" cy="85" r="8" fill="#9cb89a" opacity="0.5"/>
                    <circle cx="90" cy="80" r="6" fill="#c9b896" opacity="0.6"/>
                    <path d="M35 45 Q40 35 45 45" stroke="#9cb89a" strokeWidth="1.5" fill="none"/>
                    <circle cx="40" cy="38" r="4" fill="#9cb89a"/>
                </svg>),
                '硬核玩家': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#fef0f4" stroke="#d8a8b8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="22" fill="#fff8e8" stroke="#d8a8b8" strokeWidth="1.5"/>
                    <circle cx="50" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="70" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M52 55 Q60 62 68 55" stroke="#d8a8b8" strokeWidth="3" fill="none"/>
                    <polygon points="60,75 40,110 80,110" fill="#fff8e8" stroke="#d8a8b8" strokeWidth="1.5"/>
                    <polygon points="55,75 50,90 60,85" fill="#d8a8b8"/>
                    <polygon points="65,75 70,90 60,85" fill="#d8a8b8"/>
                    <polygon points="57,108 63,108 60,118" fill="#d8a8b8"/>
                </svg>),
                '肾上腺素狂人': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#fff0ea" stroke="#e8b8a8" strokeWidth="2"/>
                    <circle cx="60" cy="42" r="24" fill="#fff8e8" stroke="#e8b8a8" strokeWidth="1.5"/>
                    <circle cx="50" cy="38" r="5" fill="#5c4d42"/>
                    <circle cx="70" cy="38" r="5" fill="#5c4d42"/>
                    <path d="M50 52 Q60 62 70 52" stroke="#e8a8b0" strokeWidth="3" fill="none"/>
                    <path d="M60 68 L60 100" stroke="#e8b8a8" strokeWidth="3"/>
                    <polygon points="45,75 60,85 60,75" fill="#e8b8a8"/>
                    <polygon points="75,75 60,85 60,75" fill="#e8b8a8"/>
                    <polygon points="57,98 63,98 60,110" fill="#e8b8a8"/>
                    <polygon points="35,35 42,25 45,38" fill="#e8b8a8" opacity="0.6"/>
                </svg>),
                '自由浪人': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f0faf8" stroke="#a8d8c8" strokeWidth="2"/>
                    <circle cx="60" cy="48" r="22" fill="#fff8e8" stroke="#a8d8c8" strokeWidth="1.5"/>
                    <circle cx="52" cy="45" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="45" r="4" fill="#5c4d42"/>
                    <path d="M54 56 Q60 60 66 56" stroke="#a8d8c8" strokeWidth="2" fill="none"/>
                    <ellipse cx="60" cy="82" rx="15" ry="20" fill="#fff8e8" stroke="#a8d8c8" strokeWidth="1.5"/>
                    <path d="M45 70 Q30 55 40 45" stroke="#a8d8c8" strokeWidth="2" fill="none"/>
                    <path d="M42 45 Q45 40 50 42" stroke="#a8d8c8" strokeWidth="1.5" fill="none"/>
                    <circle cx="35" cy="50" r="3" fill="#a8d8c8"/>
                </svg>),
                '思想旅人': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f4f0fc" stroke="#c8a8d8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="24" fill="#fff8e8" stroke="#c8a8d8" strokeWidth="1.5"/>
                    <circle cx="52" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M55 56 Q60 60 65 56" stroke="#c8a8d8" strokeWidth="2" fill="none"/>
                    <rect x="40" y="72" width="40" height="38" rx="5" fill="#fff8e8" stroke="#c8a8d8" strokeWidth="1.5"/>
                    <rect x="45" y="78" width="30" height="22" rx="3" fill="#f4f0fc"/>
                    <text x="60" y="92" textAnchor="middle" fontSize="8" fill="#c8a8d8">?</text>
                    <path d="M35 35 Q40 25 45 35" stroke="#c8a8d8" strokeWidth="1.5" fill="none"/>
                    <circle cx="40" cy="28" r="3" fill="#c8a8d8"/>
                </svg>),
                '精神云端游民': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#fafae8" stroke="#d8d8a8" strokeWidth="2"/>
                    <circle cx="60" cy="48" r="22" fill="#fff8e8" stroke="#d8d8a8" strokeWidth="1.5"/>
                    <circle cx="52" cy="45" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="45" r="4" fill="#5c4d42"/>
                    <path d="M54 56 Q60 60 66 56" stroke="#d8d8a8" strokeWidth="2" fill="none"/>
                    <ellipse cx="60" cy="85" rx="18" ry="22" fill="#fff8e8" stroke="#d8d8a8" strokeWidth="1.5"/>
                    <circle cx="60" cy="75" r="8" fill="#d8d8a8" opacity="0.3"/>
                    <circle cx="40" cy="35" r="6" fill="#d8d8a8" opacity="0.4"/>
                    <circle cx="80" cy="30" r="5" fill="#d8d8a8" opacity="0.3"/>
                    <circle cx="35" cy="55" r="4" fill="#d8d8a8" opacity="0.2"/>
                </svg>),
                '躺平老鼠人': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f0f2fc" stroke="#a8b8d8" strokeWidth="2"/>
                    <ellipse cx="60" cy="70" rx="30" ry="25" fill="#fff8e8" stroke="#a8b8d8" strokeWidth="1.5"/>
                    <circle cx="52" cy="65" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="65" r="4" fill="#5c4d42"/>
                    <path d="M55 75 Q60 78 65 75" stroke="#a8b8d8" strokeWidth="2" fill="none"/>
                    <ellipse cx="40" cy="78" rx="12" ry="8" fill="#fff8e8" stroke="#a8b8d8" strokeWidth="1"/>
                    <ellipse cx="80" cy="78" rx="12" ry="8" fill="#fff8e8" stroke="#a8b8d8" strokeWidth="1"/>
                    <circle cx="45" cy="55" r="8" fill="#a8b8d8" opacity="0.3"/>
                    <circle cx="55" cy="45" r="6" fill="#a8b8d8" opacity="0.2"/>
                </svg>),
                '林间修行侠': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f4fae8" stroke="#b8d8a8" strokeWidth="2"/>
                    <circle cx="60" cy="48" r="22" fill="#fff8e8" stroke="#b8d8a8" strokeWidth="1.5"/>
                    <circle cx="52" cy="45" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="45" r="4" fill="#5c4d42"/>
                    <path d="M54 56 Q60 60 66 56" stroke="#b8d8a8" strokeWidth="2" fill="none"/>
                    <rect x="45" y="72" width="30" height="40" rx="15" fill="#fff8e8" stroke="#b8d8a8" strokeWidth="1.5"/>
                    <circle cx="60" cy="95" r="6" fill="#b8d8a8" opacity="0.4"/>
                    <path d="M35 35 Q40 25 45 35" stroke="#9cb89a" strokeWidth="2" fill="none"/>
                    <circle cx="40" cy="28" r="8" fill="#9cb89a" opacity="0.5"/>
                    <path d="M80 30 Q85 20 90 30" stroke="#9cb89a" strokeWidth="2" fill="none"/>
                    <circle cx="85" cy="23" r="6" fill="#9cb89a" opacity="0.4"/>
                </svg>),
                '沉浸式旅行诗人': (<svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
                    <circle cx="60" cy="60" r="50" fill="#f6faf0" stroke="#c8d8a8" strokeWidth="2"/>
                    <circle cx="60" cy="45" r="24" fill="#fff8e8" stroke="#c8d8a8" strokeWidth="1.5"/>
                    <circle cx="52" cy="42" r="4" fill="#5c4d42"/>
                    <circle cx="68" cy="42" r="4" fill="#5c4d42"/>
                    <path d="M52 55 Q60 62 68 55" stroke="#c8d8a8" strokeWidth="3" fill="none"/>
                    <rect x="40" y="70" width="40" height="35" rx="5" fill="#fff8e8" stroke="#c8d8a8" strokeWidth="1.5"/>
                    <path d="M45 80 Q55 82 65 80" stroke="#c8d8a8" strokeWidth="1.5" fill="none"/>
                    <path d="M45 88 Q55 90 65 88" stroke="#c8d8a8" strokeWidth="1.5" fill="none"/>
                    <path d="M45 96 Q55 98 65 96" stroke="#c8d8a8" strokeWidth="1.5" fill="none"/>
                    <circle cx="35" cy="35" r="5" fill="#e8a8b0" opacity="0.5"/>
                    <circle cx="85" cy="30" r="4" fill="#c8d8a8" opacity="0.6"/>
                </svg>)
            };
            return illustrations[personality] || null;
        };

        const ResultPage = ({ personality, onRestart }) => {
            const data = personalities[personality];
            
            return (<div className="min-h-screen px-4 py-8 fade-in">
                <div className="max-w-[640px] mx-auto">
                    <div className="text-center mb-6">
                        <div className="text-[#8a7a6a] mb-2">你的旅游人格是</div>
                        <div className="text-3xl font-bold mb-4" style={{color: data.color}}>{personality}</div>
                        <PersonalityIllustration personality={personality}/>
                    </div>
                    
                    <div className="bg-[#fff8f0] rounded-2xl p-6 mb-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>标签特征</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag, idx) => (<span key={idx} className="px-4 py-2 bg-[#f0f7f0] rounded-full text-sm text-[#6a7a6a]">{tag}</span>))}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>人格解析</h3>
                            <p className="text-[#5c4d42] leading-relaxed">{data.desc}</p>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>行为表现</h3>
                            <ul className="text-[#5c4d42] list-disc pl-5 space-y-1">
                                {data.behaviors.map((b, idx) => (<li key={idx}>{b}</li>))}
                            </ul>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>兴趣焦点</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.interests.map((i, idx) => (<span key={idx} className="px-3 py-1 bg-[#f5ebe0] rounded-full text-sm text-[#7a6a5a]">{i}</span>))}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>典型目的地匹配</h3>
                            <p className="text-[#5c4d42]">{data.destinations}</p>
                        </div>
                        
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2" style={{color: data.color}}>适配旅游搭子</h3>
                            <p className="text-[#5c4d42]">{data.partners}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button className="flex-1 py-4 text-lg font-bold rounded-lg bg-gradient-to-br from-[#fff8f0] to-[#fef5eb] border-2 border-[#c9b896]" onClick={onRestart}>重新测试</button>
                        <button className="flex-1 py-4 text-lg font-bold rounded-lg bg-gradient-to-br from-[#e8a8b0] to-[#d99098] border-2 border-[#c97a82]" onClick={() => alert('分享功能开发中')}>分享结果</button>
                    </div>
                </div>
            </div>);
        };

        const App = () => {
            const [page, setPage] = useState('start');
            const [currentQuestion, setCurrentQuestion] = useState(0);
            const [answers, setAnswers] = useState([]);
            const [personality, setPersonality] = useState('');
            
            const handleStart = () => { setPage('quiz'); setCurrentQuestion(0); setAnswers([]); };
            const handleAnswer = (idx) => { const newAnswers = [...answers]; newAnswers[currentQuestion] = idx; setAnswers(newAnswers); };
            const handleNext = () => {
                if (currentQuestion === questions.length - 1) {
                    setPersonality(calculateResult(answers));
                    setPage('result');
                } else {
                    setCurrentQuestion(currentQuestion + 1);
                }
            };
            const handleRestart = () => { setPage('start'); setCurrentQuestion(0); setAnswers([]); setPersonality(''); };
            
            return (<div className="app-container">
                {page === 'start' && <StartPage onStart={handleStart}/>}
                {page === 'quiz' && <QuizPage currentQuestion={currentQuestion} answers={answers} onAnswer={handleAnswer} onNext={handleNext}/>}
                {page === 'result' && <ResultPage personality={personality} onRestart={handleRestart}/>}
            </div>);
        };

        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>`;

fs.writeFileSync('/Users/yuhan/Desktop/TBTI/index.html', content);
console.log('File created successfully');
