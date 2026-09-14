const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.disable('x-powered-by');
app.get('/health', (req,res)=>res.json({ok:true,app:'neXora : CA SPECIAL'}));
app.use(express.static(__dirname, {index:'index.html'}));
app.use((req,res)=>res.sendFile(path.join(__dirname,'index.html')));
app.listen(PORT, ()=>console.log(`neXora : CA SPECIAL running on port ${PORT}`));
