const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

async function start() {

    router.get('/', (req, res) => {
        res.send("You reached me O_O?")
    })

    router.get('/:query/:location', async (req, res) => {
        const query = req.params.query;
        const location = req.params.location;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let jobs = []

        //http headers
        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            'upgrade-insecure-requests': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8'
        })

        async function getIndeedJobs() {
            await page.goto(`https://ie.indeed.com/jobs?q=${query}&l=${location}`)
            await page.waitForSelector('body')

            try {
                return await page.evaluate(() => {
                    return Array.from(document.querySelectorAll('.resultContent')).map(job => {
                        return {
                            website: 'Indeed.ie',
                            titleHref: job.querySelector('.jobTitle > a').href,
                            jobTitle: job.querySelector('.jobTitle > a > span').textContent.trim(),
                            jobCompany: job.querySelector('.companyName').textContent.trim(),
                            jobLocation: job.querySelector('.companyLocation').textContent.trim()
                        }
                    })
                })
            } catch (err) {
                console.error(`Error getting Indeed jobs: ${err}`)
                return []
            }
        }

        async function getLinkedInJobs() {
            await page.goto(`https://www.linkedin.com/jobs/search?keywords=${query}&location=${location}`)
            await page.waitForSelector('body')

            try {
                return await page.evaluate(() => {
                    return Array.from(document.querySelectorAll('.base-search-card__info')).map(job => {
                        return {
                            website: 'LinkedIn.com',
                            titleHref: job.querySelector('.base-search-card__title').parentElement.parentElement.firstElementChild.href,
                            jobTitle: job.querySelector('.base-search-card__title').textContent.trim(),
                            jobCompany: job.querySelector('.base-search-card__subtitle > a').textContent.trim(),
                            jobLocation: job.querySelector('.base-search-card__metadata > span').textContent.trim()
                        }
                    })
                })
            } catch (err) {
                console.error(`Error getting LinkedIn jobs: ${err.message}`)
                return []
            }
        }

        async function getIrishJobs() {
            try {
                await page.goto(`https://www.irishjobs.ie/ShowResults.aspx?Keywords=${query}&Location=0`);
                try {
                    await page.waitForSelector('.two-thirds');
                } catch (err) {
                    return [];
                }
                return await page.evaluate(() => {
                    return Array.from(document.querySelectorAll('div.job-result')).map(job => {
                        return {
                            website: 'IrishJobs.ie',
                            titleHref: job.querySelector('div.job-result-title > h2 > a').href,
                            jobTitle: job.querySelector('div.job-result-title > h2 > a').textContent.trim(),
                            jobCompany: job.querySelector('div.job-result-title > h3 > a').textContent.trim(),
                            jobLocation: job.querySelector('div.job-result-overview > ul > .location > a').textContent.trim()
                        }
                    });
                });
            } catch (error) {
                console.error('An error occurred while getting IrishJobs:', error);
                return [];
            }
        }
        jobs = [...jobs, ...await getIndeedJobs(),...await getIrishJobs(), ...await getLinkedInJobs()]



        res.json(jobs)
        await browser.close()
    })

}

start();

module.exports = router;




