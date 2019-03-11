import { Binary } from "./Binary";


describe("Binary class", () => {

    it("Should construct without errors", () => {
        const a = new Binary(5);
        expect(a.toString()).toEqual("101");

        const b = new Binary("1011");
        expect(b.valueOf()).toEqual(11);

        const neg = new Binary(-7);
        expect(neg.valueOf()).toEqual(-7);
        expect(neg.toString()).toEqual("11111111111111111111111111111001");
    });

    it("Should trigger reaction on binary or integer change", () => {
        const a = new Binary();
        a.value = "11";
        expect(a.valueOf()).toEqual(3);
        a.value = 8;
        expect(a.toString()).toEqual("1000");
    });

    it("Should get i-th bit", () => {
        const a = new Binary("10010");
        expect(a.getBit(4)).toEqual(1);
        expect(a.getBit(0)).toEqual(0);
        expect(a.getBit(25)).toEqual(0);
    });

    it("Should Enable/Disable bit", () => {
        const a = new Binary("101");

        expect(a.enableBit(1)).toEqual("111");
        expect(a.disableBit(2)).toEqual("11");
        expect(a.enableBit(5)).toEqual("100011");

        expect(a.toString()).toEqual("100011");
    });

    it("Should swap bits", () => {
        const a = new Binary("10001");
        expect(a.swapBits(0, 3)).toEqual("11000");
        expect(a.swapBits(0, 15)).toEqual("11000");
        expect(a.swapBits(0, 4)).toEqual("1001");
    });

    it("Should reset bits", () => {
        const a = new Binary("11111101");
        expect(a.resetBits(4)).toEqual("11110000");
    });

    it("Should concat first i-th bits with last j-th bits", () => {
        const a = new Binary("111000111");
        expect(a.getOuterBits(3, 3)).toEqual("111111");
        expect(a.getOuterBits(9, 3)).toEqual("111000111111");
    });

    it("Should get inner bits from i-th to j-th position", () => {
        const a = new Binary("100011101101");
        expect(a.getInnerBits(3, 3)).toEqual("011101");
    });

    it("Should swap bytes", () => {
        const a = new Binary("1111000000001111");
        a.swapBytes(0, 1);
        expect(a.toString(16)).toEqual("0000111111110000");
    });

});

