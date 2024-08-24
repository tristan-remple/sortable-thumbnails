// IIFE: script that runs automatically once
(() => {

    // the element in your html file that the thumbnails should render in
    const root = document.getElementById("root")

    // the element in your html file where the dropdown should be
    const options = document.getElementById("options")

    // the folder where your thumbnails are stored
    const path = "img/"

    // your list of files
    const files = [ "kyren (10)" , "kyren (14)" , "kyren (16)" , "kyren (19)" , "sasha" , "sasha (7)" , "sasha (20)" , "sasha (25)" , "sasha (28)" ]
    console.log(files)

    // boil down the files list to get the characters list
    const characters = files.reduce((list, file) => {

        // split twice: take the part of the file name before the "." and before the "("
        // trim: remove whitespace
        // tolowercase: self explanitory
        const cName = file.split(".")[0].split("(")[0].trim().toLowerCase()

        // check if the running list includes the name we got with the above process
        // ! means opposite of that, so if it DOESNT include
        if (!list.includes(cName)) {

            // add the name to the list
            list.push(cName)
        }

        // send the list to the next loop
        return list
    
    // the empty array here is the initial value of the list variable for the reduce function
    }, [])
    console.log(characters)

    // function to redraw all your thumbnails
    function rerender() {

        // first get rid of existing thumbnails
        root.innerHTML = ""

        // filter the files to a new list that only contains files that include the character selected
        const displayThumbs = files.filter(img => {
            return img.toLowerCase().includes(selected)
        })
    
        // create a thumbnail for each item
        displayThumbs.forEach(img => {

            // create an html img element
            const thumbnail = document.createElement("img")

            // set the source to the path, filename, and extension
            thumbnail.src = path + img + ".png"

            // add the thumbnail class so you can style them in your css sheet
            thumbnail.classList.add("thumbnail")

            // IMPORTANT:
            // you will need to add an event listener for your modal here
            thumbnail.addEventListener("click", onclick) // example

            // add the thumbnail to the root element
            root.appendChild(thumbnail)
        })
    }
    
    // set the initial selected value to an empty string
    // an empty string counts as being present in all strings
    let selected = ""

    // create an html select element
    const dropdown = document.createElement("select")

    // create an option that returns the selected value to empty
    const allOption = document.createElement("option")
    allOption.value = ""
    allOption.innerText = "show all"
    dropdown.appendChild(allOption)

    // for each character in the list
    // create a dropdown option that allows you to select them
    characters.forEach(chara => {

        // create the option element
        const option = document.createElement("option")

        // assign the value and label
        option.value = chara
        option.innerText = chara.replace("_", " ")

        // add it to the dropdown list
        dropdown.appendChild(option)
    })

    // make it change the selected value and redraw the thumbnails when clicked
    dropdown.addEventListener("change", (event) => {
        selected = event.target.value
        console.log(selected)
        rerender()
    })

    // put the dropdown on the page
    options.appendChild(dropdown)

    // draw the thumbnails for the first time
    rerender()

// end of the IIFE
})()