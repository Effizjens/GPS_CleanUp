var coordArray; //initializing Array
var filecontent; //initializing String
var PointArray =[]; //initializing Array
var ResultArray =[]; //initializing Array
var ResultStr; //initalizing String

/**
* @desc main function;
 *      reads txt input into a string (filecontent) and calls the self defined functions to build a polyline
* @see Learnweb
* @param event OpenFile event
*/
var ReadFile = function(event) {

	var input = event.target;
    var reader = new FileReader();


  reader.onload = function(){

      filecontent = reader.result; //coordinate data saved to this variable

console.log(filecontent);
      
      BuildArray();
      
console.log(PointArray);

      DeleteDoubles();

console.log(ResultArray);
      
    AverageValue();

console.log(ResultArray);
    
    WriteString();

      console.log(ResultStr);
    
      createFile(); 

	};
  reader.readAsText(input.files[0]);
};

/**
 * @desc transforms input String into Point Array
 */
function BuildArray() {
    coordArray = filecontent.split("\n"); // using the whitespaces to split String into an array
    for (let i = 1; i < coordArray.length; i++) {
        var split = coordArray[i].split(",");
        if(split[1] != undefined){
            PointArray.push(new Point(split[0], split[1], split[2]));
        }
    }
}

/**
 * @desc Collects all Points with the same coords
 */
function DeleteDoubles() {
    for (let i = 0; i < PointArray.length; i++) {
        var added = false;
        if(i == 0){
            ResultArray.push(PointArray[i]);
            ResultArray[i].counter ++;
        }else{
            for (let j = 0; j < ResultArray.length; j++) {
                if(PointArray[i].lat == ResultArray[j].lat && PointArray[i].long == ResultArray[j].long){
                    ResultArray[j].value += PointArray[i].value*1;
                    ResultArray[j].counter++;
                    added = true;
                    break;
                }
            }
            if(added == false){
                PointArray[i].counter = 1;
                ResultArray.push(PointArray[i]);
            }
        }
    }
}

/**
 * @desc Averages Value
 */
AverageValue = () =>{
    for (let i = 0; i < ResultArray.length; i++) {
        ResultArray[i].value = ResultArray[i].value/ResultArray[i].counter;
    }
}

/**
 * @desc Collects all Points with the same coords
 */
WriteString = () =>{
    ResultStr = `${coordArray[0]}\n`;
    for (let i = 0; i < ResultArray.length; i++) {
        ResultStr += `${ResultArray[i].lat},${ResultArray[i].long},${ResultArray[i].value}\n`
    }

}

createFile = () => {
    var name = "Test.csv";
    download(name, ResultStr);
}

download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


/**
 * @desc point class used to construct lines
 * @param lat lattitude of given coordinate
 * @param long longitude of given coordinate
 */
function Point(lat, long, value){

    //attributes
    this.lat = lat;
    this.long = long;
    this.value = value*1;
    this.counter = 0;
}