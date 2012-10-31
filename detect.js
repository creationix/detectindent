module.exports = function detectIndents(lines, fallback) {
  var stats = {};
  var leastSpaces = Infinity;
  lines.forEach(function (line) {
    if ((/^\s\*/).test(line)) { return; }  // Ignore doc blocks
    var spaces = line.match(/^ */)[0].length;
    var tabs = line.match(/^\t*/)[0].length;
    if (tabs) {
      stats.tabs = (stats.tabs || 0) + 1;
    }
    if (spaces) {
      if (spaces < leastSpaces) {
        leastSpaces = spaces;
      }
      if (spaces === leastSpaces) {
        var name = spaces;
        stats[name] = (stats[name] || 0) + 1;
      }
    }
  });
  var most = 0;
  var winner = fallback || "2";
  for (var name in stats) {
    if (stats[name] > most) {
      most = stats[name];
      winner = name;
    }
  }
  return winner;
};
