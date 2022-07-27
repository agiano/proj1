slider = function (min, max) {
  var range = [min, max];

  // set width and height of svg
  var w = 400;
  var h = 50;
  var margin = { top: 0, bottom: 20, left: 25, right: 25 };

  // dimensions of slider bar
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // create x scale
  var x = d3
    .scaleLinear()
    .domain(range) // data space
    .range([0, width]); // display space

  // create svg and translated g
  var svg = d3
    .select("#timeline")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // labels
  var labelL = g
    .append("text")
    .attr("id", "labelleft")
    .attr("x", 0)
    .attr("y", height + 5);

  var labelR = g
    .append("text")
    .attr("id", "labelright")
    .attr("x", 0)
    .attr("y", height + 5);

  // define brush
  var brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("brush", function () {
      var s = d3.event.selection;
      // update and move labels
      labelL.attr("x", s[0]).text(x.invert(s[0]).toFixed(2));
      labelR.attr("x", s[1]).text(x.invert(s[1]).toFixed(2));
      // move brush handles

      // handle.attr("display", null).attr("transform", function (d, i) {
      //   return "translate(" + [s[i], -height / 4] + ")";
      // });
      handle.attr("display", null).attr("transform", function (d, i) {
        console.log(s[i])
        return "translate(" + (s[i]-4.5) + "," + -height / 4 + ")";
      });
      // update view
      // if the view should only be updated after brushing is over,
      // move these two lines into the on('end') part below
      svg.node().value = s.map(function (d) {
        var temp = x.invert(d);
        return +temp.toFixed(2);
      });
      // svg.node().dispatchEvent(new CustomEvent("input"));
      // let event = new Event("change");
      // var eHandler = d3.select("#eventHandler").dispatch(event);
    });

  // append brush to g
  var gBrush = g.append("g").attr("class", "brush").call(brush);
  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  var brushResizePath = function (d) {
    var e = +(d.type == "e"),
      x = e ? 1 : -1,
      y = height / 2;
    return (
      "M" +
      0.5 * x +
      "," +
      y +
      "A6,6 0 0 " +
      e +
      " " +
      6.5 * x +
      "," +
      (y + 6) +
      "V" +
      (2 * y - 6) +
      "A6,6 0 0 " +
      e +
      " " +
      0.5 * x +
      "," +
      2 * y +
      "Z" +
      "M" +
      2.5 * x +
      "," +
      (y + 8) +
      "V" +
      (2 * y - 8) +
      "M" +
      4.5 * x +
      "," +
      (y + 8) +
      "V" +
      (2 * y - 8)
    );
  };

  var handle = gBrush
    .selectAll(".handle--custom")
    .data([{ type: "w" }, { type: "e" }])
    .enter()
    .append("rect")
    // .attr("class", "handle--custom")
    .attr("height", 37)
    .attr("width", 8)
    // .attr("stroke", "#000")
    .attr("fill", "#850000")
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);

  // // override default behaviour - clicking outside of the selected area
  // // will select a small piece there rather than deselecting everything
  // // https://bl.ocks.org/mbostock/6498000
  // gBrush
  //   .selectAll(".overlay")
  //   .each(function (d) {
  //     d.type = "selection";
  //   })
  //   .on("start", brushcentered);

  // // function brushcentered() {
  // //   var dx = x(1) - x(0), // Use a fixed width when recentering.
  // //     cx = d3.mouse(this)[0],
  // //     x0 = cx - dx / 2,
  // //     x1 = cx + dx / 2;
  // //   d3.select(this.parentNode).call(
  // //     brush.move,
  // //     x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]
  // //   );
  // // }

  // select entire range
  gBrush.call(brush.move, range.map(x));

  // return svg.node();
  var getRange = function () {
    var range = d3
      .brushSelection(gBrush.node())
      .map((d) => Math.round(x.invert(d)));
    return range;
  };

  return { getRange: getRange };
};

console.log(slider(0, 1).getRange())

