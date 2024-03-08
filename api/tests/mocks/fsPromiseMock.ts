export const readFileMock = jest.fn();

export const fsPromisesMock = {
    readFile: readFileMock,
};
