const result = document.querySelector(".result")
const specialityDropdown = document.querySelector("#speciality-dropdown")
const thirdSubDropdown = document.querySelector("#third-subject")

document.addEventListener("DOMContentLoaded", () => {
    updateModeSwitchIcon()
    loadSpecialities()
})

document.addEventListener("dataLoaded", (e) => {
    addSpecialitiesOptions(e.data)
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    displayPassingScore(specialityDropdown.value)
    displayCoefs(specialityDropdown.value)
})

specialityDropdown.addEventListener("change", () => {
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    displayPassingScore(specialityDropdown.value)
    displayCoefs(specialityDropdown.value)
})

thirdSubDropdown.addEventListener("change", () => {
    displayCoefs(specialityDropdown.value)
})

document.querySelectorAll(".mark-input").forEach((markInput) => {
    markInput.addEventListener("input", (e) => {
        let userInput = e.target.value
        e.target.style.color =
            !/^\d{3}$/.test(userInput) || userInput < 100 || userInput > 200 ? "red" : "black"
    })
})

document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    const ukrValue = +document.getElementById("ukr-input").value
    const mathValue = +document.getElementById("math-input").value
    const thirdValue = +document.getElementById("third-sub").value

    const specialityCode = specialityDropdown.value
    const thirdSubject = thirdSubDropdown.value

    const score = calculateScore(specialityCode, thirdSubject, ukrValue, mathValue, thirdValue)

    result.textContent = score.toFixed(2)
})

function calculateScore(specialityCode, thirdSubject, ukrValue, mathValue, thirdValue) {
    const speciality = findSpeciality(specialityCode)

    const ukrCoef = speciality.mainSubjects[0].coef
    const ukrScore = ukrCoef * ukrValue
    const mathCoef = speciality.mainSubjects[1].coef
    const mathScore = mathCoef * mathValue
    const thirdCoef = speciality.secondarySubjects.find((subj) => subj.title === thirdSubject).coef
    const thirdScore = thirdCoef * thirdValue

    // ADD YOUR COEF INSTEAD OF [* 1]
    return ((ukrScore + mathScore + thirdScore) / (ukrCoef + mathCoef + thirdCoef)) * 1
}

const addSpecialitiesOptions = (specialities) => {
    specialities.forEach((spec) => {
        const option = document.createElement("option")
        option.value = spec.code
        option.innerHTML = spec.code + " " + spec.title
        specialityDropdown.appendChild(option)
    })
}

const addSecondarySubjectOptions = (specialityCode) => {
    thirdSubDropdown.innerHTML = ""

    getSecondarySubjects(specialityCode).forEach((subj) => {
        const option = document.createElement("option")
        option.value = subj
        option.innerHTML = subj
        thirdSubDropdown.appendChild(option)
    })
}

const updateModeSwitchIcon = () => {
    const icon = document.querySelector(".icon")
    if (themeToggle.checked) {
        icon.classList.add("rotate")
    } else {
        icon.classList.remove("rotate")
    }
}

const themeToggle = document.querySelector("#theme-toggle")
const switchElement = document.querySelector(".switch")

themeToggle.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
    }
    updateModeSwitchIcon()
})

function loadSpecialities() {
    if (this.data) {
        return this.data
    }
    
    fetch("http://localhost/api/getSpecialities.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
            this.data = data
            const event = new Event("dataLoaded", {
                data: this.data
            })
            document.dispatchEvent(event)
        })
    })

    return this.data
}

const findSpeciality = (specialityCode) =>
    loadSpecialities().find((speciality) => speciality.code === specialityCode)

const getSecondarySubjects = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    return speciality.secondarySubjects.map((subject) => subject.title)
}

const displayProgram = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    document.querySelector("#program-placeholder").innerHTML =
        "Освітні програми: " + speciality.program
}

const displayCoefs = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    document.querySelector(".subject-1-coef").innerHTML =
        "Коефіцієнт: " + speciality.mainSubjects[0].coef.toFixed(2)
    document.querySelector(".subject-2-coef").innerHTML =
        "Коефіцієнт: " + speciality.mainSubjects[1].coef.toFixed(2)

    const subject3 = speciality.secondarySubjects.find(
        ({ title }) => title === thirdSubDropdown.value
    )
    document.querySelector(".subject-3-coef").innerHTML = "Коефіцієнт: " + subject3.coef.toFixed(2)
}

const displayPassingScore = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    document.getElementById("score-contract").innerHTML = speciality.minContract
        ? "Мінімальний бал на контракт: " + speciality.minContract
        : ""
}
