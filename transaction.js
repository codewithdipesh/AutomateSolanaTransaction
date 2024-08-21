import web3 from '@solana/web3.js';
import bs58 from 'bs58'



// Connect to the devnet
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');


const YOUR_SECRET_KEY_HERE = "";//private key
const TO_ADDRESS = ""//public addresss where u want to send

// Decode the secret key from base58
const secretKey = bs58.decode(YOUR_SECRET_KEY_HERE)
console.log(secretKey);
const fromWallet = web3.Keypair.fromSecretKey(secretKey);

//destination
// Convert the TO_ADDRESS string into a PublicKey object
const toPublicKey = new web3.PublicKey(TO_ADDRESS);

// Function to create and send a transaction
async function sendTransaction(fromWallet, toWallet, lamports) {
  let transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toWallet.publicKey,
      lamports: lamports,
    })
  );

  // Sign transaction, broadcast, and confirm
  let signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet]
  );
  console.log('SIGNATURE', signature);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    //check balance
    const Prebalance = await connection.getBalance(fromWallet.publicKey);
    console.log(`Balance: ${Prebalance} lamports (${Prebalance / web3.LAMPORTS_PER_SOL} SOL)`);
    //airdrop
    
    // const airdropSignature = await connection.requestAirdrop(
    //     fromWallet.publicKey,
    //     web3.LAMPORTS_PER_SOL // 1 SOL
    //   );
    
      // Confirm the transaction
    //   await connection.confirmTransaction(airdropSignature);
      
    //   //get the balance
    //   const Postbalance = await connection.getBalance(fromWallet.publicKey);
    //   console.log(`Balance: ${Postbalance} lamports (${Postbalance / web3.LAMPORTS_PER_SOL} SOL)`);
    
    
  console.log('Starting 100 transactions...');

  for (let i = 0; i < 100; i++) {
    
    try {
      await sendTransaction(fromWallet, toPublicKey,  20000000); // Sending 0.02 SOL each time
      console.log(`Transaction ${i + 1} completed`);
      console.log("Delaying 2 sec");
      await delay(2000)      
    } catch (error) {
      console.error(`Error in transaction ${i + 1}:`, error);
    }
  }

  console.log('All transactions completed');
}

main().catch(err => {
  console.error(err);
});