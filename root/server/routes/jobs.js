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

        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            'upgrade-insecure-requests': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8'
        })

        console.log("Searching....")

        async function getIndeedJobs() {
            await page.goto(`https://ie.indeed.com/jobs?q=${query}&l=${location}`)
            await page.waitForSelector('nav > div > .css-ns2mzi')
            await page.screenshot({ path: 'Test.png', fullPage: true }).then(console.log('Screenshot taken!'))

           return await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.resultContent')).map(job => {
                    return {
                        website: 'Indeed',
                        jobTitle: job.querySelector('.jobTitle > a > span').textContent,
                        jobCompany: job.querySelector('.companyName').textContent,
                        jobLocation: job.querySelector('.companyLocation').textContent
                    }
                })
            })
        }

        async function getLinkedInJobs() {
            await page.goto(`https://www.linkedin.com/jobs/search?keywords=${query}&location=${location}`)
            await page.waitForSelector('.jobs-search__results-list')
            
            return await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.base-search-card__info')).map(job => {
                    
                    return {
                        website: 'LinkedIn',
                        jobTitle: job.querySelector('.base-search-card__title').textContent.trim(),
                        jobCompany: job.querySelector('.base-search-card__subtitle > a').textContent.trim(),
                        jobLocation: job.querySelector('.base-search-card__metadata > span').textContent.trim()
                    }
                })
            })
        }

        async function getIrishJobs() {
            await page.goto(`https://www.irishjobs.ie/ShowResults.aspx?Keywords=${query}&Location=0`)
            await page.waitForSelector('.two-thirds');
            await page.screenshot({ path: 'Test.png', fullPage: true }).then(console.log('Screenshot taken!'))
        
            return await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div.job-result')).map(job => {
           
                    return {
                        website: 'IrishJobs',
                        jobTitle: job.querySelector('div.job-result-title > h2 > a').textContent.trim(),
                        jobCompany: job.querySelector('div.job-result-title > h3 > a').textContent.trim(),
                        jobLocation: job.querySelector('div.job-result-overview > ul > .location > a').textContent.trim()
                    }
                })
            })

        }


       jobs = [...jobs, ...await getIrishJobs(), ...await getLinkedInJobs(), ...await getIndeedJobs()]
        


        res.json(jobs)
        await browser.close().then(console.log('Connection Closed'))
        // res.send("Please Check Test Photo In your Folder")
    })

}

start();

module.exports = router;