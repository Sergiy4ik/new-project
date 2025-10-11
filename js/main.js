const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result");

startBtn.addEventListener("click", handleClick);

function handleClick() {
    result.innerHTML = ""
    startBtn.disabled = true;

    const promises = [...container.children].map(() => {
        return new Promise((resolve, reject) => {
            const random = Math.random()

            if (random > 0.5) {
                resolve("🤑");
            }
            else {
                reject("👿")
            }
        })
    })


    Promise.allSettled(promises)
        .then(items => {
            console.log(items);

            const isWiner = items.every(item => item.status === "fulfilled")
            items.forEach((item, i) => {
                container.children[i].innerHTML = ""

                setTimeout(() => {
                    container.children[i].innerHTML = item.value || item.reason
                    if (i === items.length - 1) {
                        result.innerHTML = isWiner ? "Winner" : "Loser"
                        startBtn.disabled = false;
                    }
                }, 1000 * (i + 1))
            })
        })

}