import crypto from "crypto";
import type { OutputAsset, OutputChunk, Plugin } from "rollup";

type ChecksumOptions = {
  filename?: string;
  includeAssets?: boolean;
};

export default function checksum(options: ChecksumOptions = {}): Plugin {
  const { filename = "checksum", includeAssets = true } = options;

  return {
    name: "checksum",
    generateBundle: function (_options, bundle, isWrite) {
      if (!isWrite) {
        return;
      }

      const hash = crypto.createHash("md5");

      if (includeAssets) {
        Object.values(bundle)
          .filter(
            (assetOrChunk): assetOrChunk is OutputAsset =>
              assetOrChunk.type === "asset"
          )
          .forEach((asset) => {
            hash.update(asset.fileName);
            hash.update(asset.source);
          });
      }

      Object.values(bundle)
        .filter(
          (assetOrChunk): assetOrChunk is OutputChunk =>
            assetOrChunk.type === "chunk"
        )
        .forEach((chunk) => {
          hash.update(chunk.fileName);
          hash.update(chunk.code);
        });

      this.emitFile({
        type: "asset",
        name: filename,
        fileName: filename,
        source: hash.digest("hex"),
      });
    },
  };
}
