async function  getResults(){

    let response = await fetch("/getReport", {
                            method: "GET"
    });
    console.log(response);
    if(response.ok){

       let result = await response.json();
       plot(result.result);

    }
    else{

        alert("Issue with the network");
    }



};

function plot(result){

    let user = result.userdetails;
    tablePlot(user);
    let x_data = [];
    let y_data = [];
    
    user.forEach((element, index)=>{

            y_data.push(element.weight);
            x_data.push(element.date.slice(0, 10));
            
    });
    
    let obj = [{
      
        x: x_data,
        y: y_data,
        type: 'scatter'
    
    }];
    
    Plotly.newPlot("table", obj);

};

function tablePlot(result){

    let tableID = document.getElementById("display_table");

    result.forEach((element, index)=>{

            let row = tableID.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            cell1.innerHTML = element.weight;
            cell2.innerHTML = element.date.slice(0, 10);

    })


}