d3.json("samples.json").then((incomingData) => {
    var data = incomingData.metadata
        
    //Populate dropdown with names
    var dropDown = d3.selectAll("#selDataset")
        data.forEach(d => {
        var item = dropDown.append("option")
        item.text(d.id)
    });

    //Select Dropdown Control
    var idSelect = d3.select("#selDataset")
    idSelect.on("change", runFilter);

    //function to run once dropdown selected value changes
    function runFilter() {
        //prevent default
        d3.event.preventDefault();
        
        //Value of dropdown
        var selectedId = idSelect.property("value")

        //Demographic data 
        var demoData = []
        var demoData = data.filter(d => d.id == selectedId)
        var demoList = d3.select("#sample-metadata")
        var demoEntries = demoData[0]
        
        //remove existing table
        d3.select("table").remove();
        //append new table
        demoList.append("table").append("tbody")

        //Populate Demographic Info
        Object.entries(demoEntries).forEach(function([key,value]) {
            var tableData = d3.select("tbody").append('tr').append('td')
            tableData.text(`${key}: ${value}`)
        })
        
        //Process samples data
        var samples = incomingData.samples
        var filteredSample = samples.filter(d => d.id == selectedId)[0]

        // var sortedd = filteredSample.sort(function(a,b) {
        //     return parseFloat(b.sample_values)-parseFloat(a.sample_values);
        // });

        var dataSet = []
        for (var i=0; i<10;i++) {
            dataSet.push({
                sampleValue: filteredSample.sample_values[i],
                sampleTitle: `OTU ${filteredSample.otu_ids[i]}`,
                sampleLabel: filteredSample.otu_labels[i]
            })
        };

        var dataSet = dataSet.reverse();

        var trace1 = {
            x: dataSet.map(row => row.sampleValue),
            y: dataSet.map(row => row.sampleTitle),
            text: dataSet.map(row => row.sampleLabel),
            name: "Sample Value",
            type: "bar",
            orientation: "h"
        };

        var chartData = [trace1]

        var layout = {
            title: "Top 10 OTU's",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
        };

        Plotly.newPlot("bar", chartData, layout);
        
    }
})