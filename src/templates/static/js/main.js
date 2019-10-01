async function  getResults(){

    let response = await fetch("/getReport", {
                            method: "GET"
    });
    console.log(response);
    if(response.ok){

       let result = await response.json();
       if(result.userdetails != null)
            plot(result.result);
        else{
            alert("You have given no input till now.")
        }
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
async function validate(event){
    try{
    
    event.preventDefault();
    let pass = document.querySelector(`[name = "password"]`).value;
    let confirm = document.querySelector(`[name = "confirm"]`).value
    let flash = document.querySelector(`[name = "flash-msg"]`);
    let User = document.querySelector(`[name = "User"]`).value;
    let Email = document.querySelector(`[name = "Email"]`).value;
    
    if(pass != confirm){
        alert("Both password field is not matching");        
        return false;
    }
    else if(pass.length < 8){
        alert("Password must be more than 8 characters.");        
        return false;
    }
    else{
        
        let user = {User: User, Email: Email, password: pass};
        
        let result = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
              }
        });

        result = await result.json();
        alert(JSON.stringify(result));
        
        if(result.sucess === true){
            flash.innerHTML = "Signup successful";
            return true;
        }
        else{
            flash.innerHTML = result.error;
            return false;
        }
        
    }
    }
    catch(err){
        alert(err);
    }

}