const fs = require('fs');
const file = 'OpsHero.jsx';
let content = fs.readFileSync(file, 'utf8');

// remove any trailing newlines from content
content = content.replace(/[\r\n]+$/, '');

content += `
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync(file, content);
console.log('Fixed');
