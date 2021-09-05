
// how to parse the text - done
// make a functionality in backend to parse the text - done

const { text } = require("body-parser")

// function to tell total number of characters
t = {text: "In addition, WordCounter shows you the top 10 keywords and keyword density of the article you're writing. This allows you to know which keywords you use how often and at what percentages. This can prevent you from over-using certain words or word combinations and check for best distribution of keywords in your writing"}
//const text = JSON.parse(t)
//console.log(t.text)

function totalCharacters (textObject) {
    let characters = 0
    newText = textObject.text.trim()
    
    for(let ele of newText) {
        if (ele !== ' ')  characters += 1
    }
    //console.log("characters ",characters)
    return characters
}

function totalWords (textObject) {
    newText = textObject.text.trim()
    wordsArray = newText.split(" ")
    //console.log(wordsArray, wordsArray.length)
    //frequencyCounter(wordsArray)
    if (wordsArray[0] === '') return 0
    else return wordsArray.length
}

function totalSentences (textObject) {
    newText = textObject.text.trim()
    sentenceArray = newText.split(". ")
    //console.log(sentenceArray, sentenceArray.length)
    if (sentenceArray[0] === '') return 0
    else return sentenceArray.length 
}

function totalParagraphs (textObject) {
    newText = textObject.text.trim()
    paragraphArray = newText.split("\n")
    //console.log(paragraphArray, paragraphArray.length)
    if (paragraphArray[0] === '') return 0
    
    l = 0
    for (let ele of paragraphArray) {
        if (ele !== '\r') l += 1 
    } 
    return l 
}

function frequencyCounter (textObject) {
    newText = textObject.text.trim()
    wordsArray = newText.split(" ")

    finalObject = {}
    tempArray = []
    for (let ele of wordsArray) {
        if (!tempArray.includes(ele)) tempArray.push(ele)
    }
    //console.log(wordsArray)
    //console.log(tempArray)
    c = 1
    while(c <= tempArray.length) {
        tempWord = tempArray[c - 1] 
        //console.log(tempWord, c)
        frequency = 0
        for (let ele of wordsArray) {            
            if (ele === tempWord) {
                frequency += 1
            } 
        }
        //console.log(frequency)
        finalObject[tempWord] = frequency
        c++
    }
    //console.log(finalObject)
    arr = []
    for (let ele in finalObject) {
        arr.push([ele,finalObject[ele]])
    }
    arr.sort((a, b) => b[1] - a[1])
    arr = arr.splice(1, 11)
    for (i = 1; i< arr.length; i++) {
        if (!i % 2 === 0) {
            arr[i] = arr[i] + '<br>'
        }
    }
    arr[0][1] += '<br>'
    str = arr.toString().split(',').join(' ')
    
    console.log( str)
    return str

    //console.log(Object.keys(finalObject).slice(1 - 11))
    //return Object.keys(finalObject)
}


//totalWords(t)
//totalCharacters(t)
//totalSentences(t)
//totalParagraphs(t)
frequencyCounter(t)

module.exports = {totalWords, totalCharacters, totalSentences, totalParagraphs,
     frequencyCounter}