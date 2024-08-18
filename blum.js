document.querySelector('.Retry').style.display = 'none';
const start_btn = document.getElementById('start_btn');
start_btn.addEventListener('click', () => {
    document.querySelector('.Welcome_box').style.display = 'none';

    let leafCount = 0;
    let bombCount = 0;
    const maxLeaves = 1000;
    const gameDuration = 30;

    function createLeaf() {
        if (leafCount >= maxLeaves) {
            return;
        }

        const leaf = document.createElement("div");
        leaf.classList.add('leaf');
        leaf.style.animation = "fall 3s linear infinite";
        leaf.style.left = `${Math.random() * 90}%`;
        leaf.style.top = `-${Math.random() * 100}px`; // Начальная позиция за пределами экрана
        document.querySelector(".background-container").appendChild(leaf);
        leafCount++;

        const coin = document.querySelector(".coin");

        leaf.addEventListener('click', () => {
            leaf.style.transition = '.5s';
            leaf.style.backgroundColor = 'gold';
            leaf.style.transform = 'scale(0)';
            coin.innerHTML = parseInt(coin.innerHTML) + 1;

            setTimeout(() => {
                leaf.style.display = 'none';
            }, 3000);
        });
    }

    function createBomb() {
        if (bombCount >= maxLeaves) {
            return;
        }

        const bomb = document.createElement("div");
        bomb.classList.add('bomb');
        bomb.style.animation = "fall 3s linear infinite";
        bomb.style.left = `${Math.random() * 70}%`;
        bomb.style.top = `-${Math.random() * 100}%`; // Начальная позиция за пределами экрана
        document.querySelector(".background-container").appendChild(bomb);
        bombCount++;

        const coin = document.querySelector(".coin");

        bomb.addEventListener('click', () => {
            bomb.style.transition = '.5s';
            bomb.style.backgroundColor = 'gold';
            bomb.style.transform = 'scale(0)';
            coin.innerHTML = Math.max(0, parseInt(coin.innerHTML) - 50);
            document.querySelector('.animate').style.animation = 'bomb 0.3s 3 linear forwards';

            setTimeout(() => {
                document.querySelector('.animate').style.animation = '';
            }, 500);

            setTimeout(() => {
                bomb.style.display = 'none';
            }, 3000);
        });
    }

    function startGame() {
        const time = document.querySelector('.time');
        const coin = document.querySelector('.coin');
        let remainingTime = gameDuration;

        time.innerHTML = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
        coin.innerHTML = "0";

        //............ ok
        const gameIntervalId = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                clearInterval(gameIntervalId);
                time.innerHTML = '00:00';
                document.querySelector('.Retry').style.display = 'flex';
                document.getElementById('score').innerHTML = coin.innerHTML;
                document.querySelector('.retry').addEventListener('click', () => {
                    document.querySelector('.Retry').style.display = 'none';
                    location.reload();
                });
                return;
            }

            time.innerHTML = `00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;

        }, 1000);

        function createRandomLeaf() {
            setTimeout(() => {
                createLeaf();
                if (leafCount < maxLeaves) {
                    createRandomLeaf();
                }
            }, 700); 
        }

        function createRandomBomb() {
            setTimeout(() => {
                createBomb();
                if (bombCount < maxLeaves) {
                    createRandomBomb();
                }
            },8000); 
        }

        createRandomLeaf();
        createRandomBomb();
    }

    startGame();
});
