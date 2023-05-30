import fs from 'fs-extra';
fs.readFile('build/custom_icon/all.svg', (err, data) => {
  if (err) {
    return console.error(err);
  }
  var avgStr = data.toString();
  if (avgStr) {
    var matches = avgStr.match(/<symbol\b[^>]*>([\s\S]*?)<\/symbol>/ig);
    var iconNames = [];
    matches.map((svg) => {
      const name = /(?<=\<symbol.*id=\").*?(?=\")/i.exec(svg)[0];
      iconNames.push(name);
      const content = svg
        .replace(/symbol/gi, "svg")
        .replace(/id=\"\S+\"/, "")
        .replace(/(?<=<[^>]*) [^>]*(?=>)/, (v) => {
          return v + ` width="20" height="20"`;
        });
      fs.writeFile(`custom/icons/${name}.svg`, content, (err) => {
        if (err) {
          return console.log(err);
        }
      });
    });
    var html = [];
    while (iconNames.length > 0) {
      var names = iconNames.splice(0, 10);
      html.push(`<div>
      <ul class="uk-list">
        ${names.map((name) => {
        return `<li><span class="uk-margin-small-right" uk-icon="icon: ${name}; ratio:1"></span>${name}</li>`;
      }).join("")}</ul></div>`);
    }
    console.log(html.join(""));
  }
})