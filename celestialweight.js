//Earth/Moon Weight Comparison Tool (JS Edition)
//More celestial bodies on the way.
var ibodies; //Stores name of input body.
var obodies; //Stores name of output body.
var step = 0; //Progress tracker.
var idx1; //Index storage for input.
var idx2; //Index storage for output.
var resource; //Used to store resource.
//Names of Bodies Array:
var bodies = ["Pick One","Mercury", "Venus", "Earth", "The Moon", "Mars", "Phobos", "Deimos", "Ceres", "Jupiter", "Ganymede", "Europa", "Callisto", "Io", "Saturn", "Titan", "Enceladus", "Tethys", "Rhea", "Dione", "Iapetus", "Mimas", "Hyperion", "Uranus", "Ariel", "Umbriel", "Oberon", "Titania", "Miranda", "Neptune", "Triton", "Pluto", "Charon", "Nix", "Hydra", "Styx", "Kerberos", "Makemake", "Haumea", "Eris", "Sedna", "Sun", "Proxima Centauri", "Proxima B", "Alpha Centauri A", "Alpha Centauri B", "Sirius A", "Sirius B", "TRAPPIST-1b", "TRAPPIST-1c", "TRAPPIST-1d", "TRAPPIST-1e", "TRAPPIST-1f", "TRAPPIST-1g", "TRAPPIST-1h", "55 Cancri E", "WASP-12b", "Polaris A", "UY Scuti", "Sagittarius A*"];
//Gravity of Bodies Array:
var gravity = [0, 3.70, 8.87, 9.81, 1.622, 3.71, 0.0057, 0.003, 0.28, 24.79, 1.428, 1.316, 1.23603, 1.719, 10.44, 1.353, 0.113, 0.145, 0.264, 0.232, 0.223, 0.064, 0.02, 8.87, 0.249, 0.2, 0.354, 0.367, 0.077, 11.15, 0.782, 0.620, 0.288, 0.000163, 0.051, 0.00080086, 0.00305037, 0.5, 0.401, 0.82, 0.5, 274, 0.052, 8.50, 201, 333, 189, 3719197, 8.39, 11.1, 5.11, 10.9, 9.5, 10.4, 5.98, 20.99, 25.939, 0.584, 0.003162, 3540000];
//Model IDs for Each Body:
var pics = [0, 2369, 2342, 2392, 2366, 2372, 2358, 2434, 2400, 2375, 2385, 2388, 2402, 2379, 2355, 2349, 2391, 2351, 2354, 2396, 2381, 2368, 2382, 2344, 2406, 2345, 2362, 2348, 2367, 2364, 2346, 2357, 2399, 0, 0, 0, 0, 2374, 2384, 2390, 0, 2352, 0, 2211, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2210, 2212, 0, 0, 0];

//Calls Dropdown Setup Function upon launch.
setupDropdown();

//Sets up choices for the input dropdown.
function setupDropdown(){
    var option = ""; //Defines variable option for display.
    //Adds body from the name array for each increment, filling the dropdown list until it reaches the end of the array.
    for (var i=0; i<bodies.length; i++){
        option += '<option value="'+ bodies[i] +'">' + bodies[i] + "</option>";
    }
    document.getElementById("bodies").innerHTML = option; //Displays all options grabbed by the for loop.
}

//Checks if the body has a model or a picture.
function modelOrPic (){
    //Step 0 is input, Step 1 is output.
    if (step == 0){ //For INPUT body.
        idx1 = bodies.indexOf(ibodies); //Gets index from chosen input body.
        var model = pics[idx1]; // Uses index to grab model ID.
        if (model == 0){
            var picslot = (ibodies+".jpg"); //Sets iframe to show image if no model exists.
            document.getElementById("img1").src = picslot; //Displays image.
        } else {
            //Changes resource for NASA.gov depending on if it's of the solar system or an exoplanet, etc.
            if ((pics[idx1] == 2211) || (pics[idx1] == 2210) || (pics[idx1] == 2212)){ //Checks for Exoplanet Model IDs.
                resource = "exoplanets";
            } else {
                resource = "solarsystem";
            }
            var picslot = ("https://"+resource+".nasa.gov/gltf_embed/"+model); //Sets iframe to show model if it exists.
            document.getElementById("img1").src = picslot; //Displays model.
        }
    } else if (step == 1) { //For OUTPUT body.
        idx2 = bodies.indexOf(obodies); //Gets index from chosen input body.
        var model = pics[idx2]; // Uses index to grab model ID.
        if (model == 0){
            var picslot2 = (obodies+".jpg"); //Sets iframe to show image if no model exists.
            document.getElementById("img2").src = picslot2; //Displays image.
        } else {
            //Changes resource for NASA.gov depending on if it's of the solar system or an exoplanet, etc.
            if ((pics[idx2] == 2211) || (pics[idx2] == 2210) || (pics[idx2] == 2212)){ //Checks for Proxima B.
                resource = "exoplanets";
            } else {
                resource = "solarsystem";
            }
            var picslot2 = ("https://"+resource+".nasa.gov/gltf_embed/"+model); //Sets iframe to show model if it exists, also sets it to proper resource.
            document.getElementById("img2").src = picslot2; //Displays model.
        }
    }
}

//Gets names when you select something in the body select dropdown.
function update(bodies){
    //Checks for steps completed, to prevent repeating upon input.
    if (step == 0){
        ibodies = document.getElementById("bodies").value;//Gets input for Body 1 from dropdown and stores it.
        modelOrPic(); //Check for img/model
        document.getElementById("iname").innerHTML = (ibodies+" and "); //Display Name
        step++; //Increases step so the next time a drop down option is chosen, it will not do this again.
        setupDropdown(); //Sets up the dropdown again.
    } else if (step == 1){
        obodies = document.getElementById("bodies").value;//Gets input for Body 2 from dropdown and stores it.
        modelOrPic(); //Check for img/model
        document.getElementById("iname").innerHTML = (ibodies+" and "+obodies); //Display Name
        step++; //Increases step so the next time a drop down option is chosen, it will not do this again.
    }
}


//When ignition button is pressed, it will perform the math problem and display output.
function math(){
    if (step == 2){
        weight = document.getElementById("weight").value; //Grabs the weight from the input box.
        unit = document.getElementById("units").value; //Grabs the unit chosen from the unit dropdown box.
        idx1 = bodies.indexOf(ibodies); //Gets the index of the input body selected.
        var igrav = gravity[idx1]; //Uses found index to find gravity of said body, and stores it in a variable.
        idx2 = bodies.indexOf(obodies); //Same thing for next 2 lines, but for the output body this time.
        var ograv = gravity[idx2];
        //Formula
        var firststep = weight / igrav; //Divides input weight by input's gravity.
        var output = firststep * ograv; //Multiplies previous answer by output's gravity.
        step++//Increases to Step 3 (Can't redo the previous code).
        if (ibodies == obodies){
            document.getElementById("output").innerHTML = ("May I ask you why in your right mind would you pick TWO of the SAME BODY?"); //This outputs when you pick two of the same body.
        } else {
            document.getElementById("output").innerHTML = ("If you weigh "+weight+" "+unit+" on "+ibodies+", you'd weigh "+output+" "+unit+" on "+obodies+"."); //Displays output.
        }
    }
}
