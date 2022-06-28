import type { Commitment, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '@/Metaplex';
import { useOperation, Operation, OperationHandler } from '@/types';
import { AccountNotFoundError } from '@/errors';
import { parseAuctionHouseAccount } from './accounts';
import { AuctionHouse, makeAuctionHouseModel } from './AuctionHouse';

// -----------------
// Operation
// -----------------

const Key = 'FindAuctionHouseByAddressOperation' as const;
export const findAuctionHouseByAddressOperation =
  useOperation<FindAuctionHouseByAddressOperation>(Key);
export type FindAuctionHouseByAddressOperation = Operation<
  typeof Key,
  FindAuctionHouseByAddressOperationInput,
  AuctionHouse
>;

export type FindAuctionHouseByAddressOperationInput = {
  address: PublicKey;
  commitment?: Commitment;
};

// -----------------
// Handler
// -----------------

export const findAuctionHouseByAddressOperationHandler: OperationHandler<FindAuctionHouseByAddressOperation> =
  {
    handle: async (
      operation: FindAuctionHouseByAddressOperation,
      metaplex: Metaplex
    ) => {
      const { address, commitment } = operation.input;
      const unparsedAccount = await metaplex
        .rpc()
        .getAccount(address, commitment);

      if (!unparsedAccount.exists) {
        throw new AccountNotFoundError(address, 'AuctionHouse');
      }

      const account = parseAuctionHouseAccount(unparsedAccount);

      return makeAuctionHouseModel(account, null); // TODO
    },
  };
