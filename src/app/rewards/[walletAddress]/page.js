"use client";

import React from "react";
import * as fcl from "@onflow/fcl";
import "../../cadence/config";

function RewardStudent({ params }) {
  async function mintNFTs() {
    // Get the current date
    const now = new Date();

    // Extract the day, month, and year
    const day = String(now.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary, month is 0-indexed
    const year = now.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    const names = ["Overall Achievement"];
    const descriptions = [
      `This is the logo awarded to ${params.walletAddress} for their overall achievements on ${formattedDate}.`,
    ];
    const thumbnails = [
      "https://raw.githubusercontent.com/Taher2512/diversion-2k24/main/public/1706853139144.svg",
    ];

    try {
      const transactionId = await fcl.mutate({
        cadence: `
            import ExampleNFT from 0xb0c53c256c7f2a13
            import NonFungibleToken from 0xStandard
            
            transaction(names: [String], descriptions: [String], thumbnails: [String], recipient: Address) {
              let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
              
              prepare(signer: AuthAccount) {      
                self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                            .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                            ?? panic("The recipient has not set up an ExampleNFT Collection yet.")
              }
            
              execute {
                var i = 0
                while i < names.length {
                  ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: names[i], description: descriptions[i], thumbnail: thumbnails[i])
                  i = i + 1
                }
              }
            }
            `,
        args: (arg, t) => [
          arg(names, t.Array(t.String)),
          arg(descriptions, t.Array(t.String)),
          arg(thumbnails, t.Array(t.String)),
          arg("0x8790b3668772ecc7", t.Address),
        ],
        proposer: fcl.authz,
        payer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 999,
      });
      console.log("Transaction Id", transactionId);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={() => mintNFTs()}>Mint</button>
      <span>{params.walletAddress}</span>
    </div>
  );
}

export default RewardStudent;
