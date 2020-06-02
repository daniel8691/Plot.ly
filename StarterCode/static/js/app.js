
d3.json("samples.json").then(function(data) {

    // console.log(data);
    console.log(data.samples[0])
    console.log(data)

    // demographic info textbox
    var demographicInfo = d3.select("#sample-metadata");
    // remove the kids
    demographicInfo.html("");
    // insert the key values into the textbox
    Object.entries(data['metadata'][0]).forEach(function([key,value]){
        demographicInfo.append("p").text(`${key} : ${value}`)
    });

    /********************************************************************** */

    // Dropdown menu
    var dropDownMenu = d3.select("#selDataset");
    // var optionTags = d3.select("")
    var optionTags = dropDownMenu.selectAll("option").data(data['names']);
    optionTags.enter()
        .append('option')
        // set <option value=" ">
        .attr("value", (name) => name)
        // set option contents
        .text((name)=>name)
    
    var selectedSample = data['samples'].filter(function(covid){
   
        console.log(covid['id'])
    })
    

    /********************************************************************** */


    // define x and y values
    var xSample = data['samples'][0]['sample_values']
    .slice(0,10)
    .sort(function(a,b){
        return a-b
    });
    var ySample = data['samples'][0]['otu_ids']
    .map(function(someID){
        return `OTU ${someID}`
    })

    // Create them graphs
    // Create traces
    var trace1 = {
        x:data['samples'][0]['sample_values']
            .slice(0,10)
            .sort(function(a,b){
                return a-b
            }),
        y:data['samples'][0]['otu_ids']
            .map(function(someID){
                return `OTU ${someID}`
            }),
        text: data['samples'][0]['otu_labels'],
        type:"bar",
        orientation:'h'

    };
    var dataBar = [trace1];

    Plotly.newPlot('bar',dataBar);
    data['samples'][0]['sample_values']
    // Bubble Chart:
    var traceBubbles = {
        x: data['samples'][0]["otu_ids"],
        y: data['samples'][0]['sample_values'],
        text: data['samples'][0]['otu_labels'],
        mode: "markers",
        marker: {
            size: data['samples'][0]["sample_values"],
            color: data['samples'][0]['otu_ids']
        }
     };

    var dataBubble = [traceBubbles];

    var layoutBubble = {
        xaxis: {
            title:{
                text: "OTU ID"
            }
        }
    }
    Plotly.newPlot('bubble', dataBubble, layoutBubble)

    /********************************************************************** */
    d3.selectAll("#selDataset").on("change",function(){
        var fallingMenu = d3.select("#selDataset");

        var dataset = fallingMenu.property("value");

        for (var i = 0; i<data['samples'].length; i++){
            
            if(dataset == data['samples'][i]['id']) {
     
                x = data['samples'][i]['sample_values']
                .slice(0,10)
                .sort(function(a,b){
                    return a-b
                });

                y = data['samples'][i]['otu_ids']
                .map(function(someID){
                    return `OTU ${someID}`
                });  
                
                // the x and y values we want to change
                xBubble = data['samples'][i]["otu_ids"];
                yBubble = data['samples'][i]['sample_values']


                // change the demographic info textbox
                // remove the old kids
                demographicInfo.html("");
                // insert the key values into the textbox
                Object.entries(data['metadata'][i]).forEach(function([key,value]){
                    demographicInfo.append("p").text(`${key} : ${value}`)
                });

                
                // test what id we're on
                console.log(data['samples'][i]['id'])     
            };
        }
  

       
        // change the bar plot
        Plotly.restyle("bar","x",[x]);
        Plotly.restyle("bar","y",[y]);
        // change the bubble plot 
        // change the previously defined x and y into the new values
        Plotly.restyle("bubble","x",[xBubble]);
        Plotly.restyle("bubble",'y',[yBubble]);
    
        
    });

});

 



