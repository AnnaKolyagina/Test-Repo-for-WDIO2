//HW28 part 2
import type { ChainablePromiseElement } from 'webdriverio';

describe('Fetch button tests', () => {
    const url = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';
    let fetchBtn: ChainablePromiseElement;//ChainablePromiseElement — это тип элемента DOM, который возвращается при await $('#selector') в WebdriverIO.Он “обещает” элемент (Promise<Element>)
    let resultDiv: ChainablePromiseElement;

    beforeEach(async () => {
        await browser.url(url);
        fetchBtn = await $('#fetchBtn');
        resultDiv = await $('#result');
    });

    it('check 200 success', async () => {
        await browser.execute(() => {
            window.fetch = () =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ message: 'Success! Expected data received.' })
                } as unknown as Response);//это TypeScript трюк, чтобы привести объект к типу Response
        });
        await fetchBtn.click();//При клике срабатывает скрипт на странице, который делает fetch (уже подменённый через execute).
        await resultDiv.waitUntil(async () => (await resultDiv.getText()) !== '');//Ждём, пока текст внутри блока resultDiv станет не пустым.
        const text = await resultDiv.getText();
        expect(text).toBe('Success! Expected data received.');
        const className = await resultDiv.getAttribute('class');
        expect(className).toBe('success');
    });

    it('check 403 error', async () => {
        await browser.execute(() => {
            window.fetch = () =>
                Promise.resolve({
                    status: 403,
                    json: () => Promise.resolve({ message: 'Forbidden access' })
                } as unknown as Response);
        });
        await fetchBtn.click();
        await resultDiv.waitUntil(async () => (await resultDiv.getText()) !== '');
        const text = await resultDiv.getText();
        expect(text).toBe('Error 403: Forbidden');
        const className = await resultDiv.getAttribute('class');
        expect(className).toBe('error');
    });

    it('check network error', async () => {
        await browser.execute(() => {
            window.fetch = () => Promise.reject(new Error('Network error'));//Подменяем fetch так, чтобы он отклонял промис, имитируя сетевую ошибку.
        });
        await fetchBtn.click();
        await resultDiv.waitUntil(async () => (await resultDiv.getText()) !== '');
        const text = await resultDiv.getText();
        expect(text).toBe('Network error');
        const className = await resultDiv.getAttribute('class');
        expect(className).toBe('error');
    });
});
