//deposit amount
//number lines to be bet
//collect bet amount
//spin slot machine
//display results
//calculate winnings
//manage transactions


const ROWS=3;
const COLOUMNS=3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
};
const SYMBOLS_VALUE={
    A:5,
    B:4,
    C:3,
    D:2
};

const prompt=require("prompt-sync")();
const deposit = ()=>{
    const depositAmount = prompt("Enter the deposit amount: ");
    const depositNumAmount=parseFloat(depositAmount);

    if(depositNumAmount <= 0 || isNaN(depositNumAmount)){
        console.log("Invalid deposit amount");
        deposit();
    }
    else{
        console.log("Deposit of ",depositNumAmount," is successful");
        return depositNumAmount;
    }

};

const linesToBet = ()=>{
    const lines=prompt("Enter no of lines to Bet(1-3): ");
    const line=Number(lines);
    if(line <=0 || line > 3 || isNaN(line)){
        console.log("Invalid number of lines");
        linesToBet();
    }
    else{
        console.log("No. of lines to bet: ",line);
        return line;
    }
};

const getBet=(balance,lines)=>{
    const betAmount=prompt("Enter Bet amount per line: ");
    const bet=parseFloat(betAmount);
    if(bet > (balance/lines) || bet <= 0 || isNaN(bet)){
        console.log("Invalid bet amount");
        getBet();
    }
    else{
        return bet*lines;
    }
};

const spin = ()=>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){  //notes
        for(let i=1;i<=count;i++){
            symbols.push(symbol);
        }
    }

    const reel=[[],[],[]];
    for(let i=0;i<COLOUMNS;i++){
        const reelsymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randNum = Math.floor(Math.random()*reelsymbols.length);
            const selelectedIdx=reelsymbols[randNum];
            reel[i].push(selelectedIdx);
            reelsymbols.splice(randNum,1);
        }
    }
    return reel;
};

const transpose = (reel)=>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLOUMNS;j++){
            rows[i].push(reel[j][i]);
        }
    }
    return rows;
};

const printResult=(rows)=>{
    for(const row of rows){
        let result="";
        for(const [i,symbol] of row.entries()){
            result+=symbol;
            if(i!=row.length-1){
                result+=" | ";
            }
        }
        console.log(result);
    }
};

const getWinning=(rows,bet,lines)=>{
    let winningAmnt=0;
    for(let row=0;row<lines;row++){
        let same=true;
        const symbols = rows[row];
        for(const symbo of symbols){
            if(symbo != symbols[0]){
                same=false;
                break;
            }
        }

        if(same){
            winningAmnt+= bet * SYMBOLS_VALUE[symbols[0]];
        }
    }
    return winningAmnt;
};


const game=()=>{
    let balance=deposit();

    while(true){
        const lines=linesToBet();
        const betAmount=getBet(balance,lines);
        balance-=betAmount;
        const sp=spin();
        const p=transpose(sp);
        printResult(p);
        const winn=getWinning(p,betAmount,lines)
        console.log(`Your Winnings $: ${winn}`);
        balance+=winn;
        console.log(`Your current balance $: ${balance}`);

        const regame=prompt("Do you want to play again (Y/N)?: ");

        if(regame != "Y" && regame != "N"){
            console.log("Invalid input");
            game();
        }
        else if(regame =="Y"){
            if(balance <=0 ){
                console.log("Insufficient balance");
                break;
            }
            console.log("New game Started");
            game();
        }
        else{
            console.log("Exit Game!");
            break;
        }
    }
};
game();



