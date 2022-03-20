function bodyLoad() {

    // checking function working or not ?????
    console.log("bodyLoad Execution started");

    // getting required id i.e, "welcome"
    let welcome = document.getElementById("welcome");

    // getting screen size of the device
    let screenHeight = screen.height + "px";
    //console.log(screenHeight);

    // applying the properties style.height
    welcome.style.height = screenHeight;
}