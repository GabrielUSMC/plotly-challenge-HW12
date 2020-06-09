d3.json("../samples.json").then(importedData => {
    var data = importedData;
    // console.log(JSON.stringify(data));
    var samples = data.samples;
    var ids = samples.map(d => d.id);
    // console.log(ids);

    // data = data.sort(function(a,b) {
    //     return parseFloat(b.) - parseFloat(a.);
    // });

    d3.select("#selDataset").selectAll("option")
    .data(ids)
    .enter()
    .append("option")
    .html(d => `${d}`);

    function change() {
        // Prevent the page from refreshing
        if (d3.event) {
            d3.event.preventDefault();
        }

        // Select the input value from the form
        var id = d3.select("#selDataset").node().value;
        // console.log(id);

        var sample = samples.filter(sample => sample.id === id)[0];
        var values = sample.sample_values;
        var otu_ids = sample.otu_ids;
        var labels = sample.otu_labels;

        var trace1 = {
            x: values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(y => `OTU ${y}`).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        // console.log(trace1.x);
        // console.log(trace1.y);
        // console.log(trace1.text);
        var barData = [trace1];
        Plotly.newPlot("bar", barData);

        var trace2 = {
            x: otu_ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: otu_ids
            }
        }

        var bubbleData = [trace2];
        Plotly.newPlot("bubble", bubbleData);

        var demo = data.metadata.filter(sample => sample.id === parseInt(id))[0];
        demoKeys = Object.keys(demo);
        // console.log(demo);
        d3.select(".panel-body").html("")
        d3.select(".panel-body").selectAll("div")
        .data(demoKeys)
        .enter()
        .append("div")
        .html(d => `<div>${d}: ${demo[d]}</div>`);

    }

    change();

    d3.select("#selDataset").on("change", change);
});