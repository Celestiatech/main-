import './AuditTool.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import ReactSpeedometer from "react-d3-speedometer";
import { FaFile, FaHtml5, FaCss3Alt, FaJsSquare, FaImage, FaEllipsisH } from 'react-icons/fa';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ProgressBar } from "react-bootstrap";



const AuditTool = () => {
    const [url, setUrl] = useState('');
    const [screenshotUrl, setScreenshotUrl] = useState('');
    const [moblieScreenshortUrl, setmoblieScreenshortUrl] = useState('');
    const [tabletScreenshortUrl, settabletScreenshortUrl] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRequests, setTotalRequests] = useState(0);
    const [completedRequests, setCompletedRequests] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [totalTrueResponses, setTotalTrueResponses] = useState(0);
    const [totalOnPageSeo, setTotalOnPageSeo] = useState(0);
    const [totalTechnicalSeo, setTotalTechnicalSeo] = useState(0);
    const [totalSeoScore, settotalSeoScore] = useState(0);
    const [sitePerformance, setsitePerformance] = useState(0);
    const [socialLinkPercentage, setsocialLinkPercentage] = useState(0);
    const [averageUsability, setAverageUsability] = useState(0);
    const [performance, setperformance] = useState(0);
    const [showPortlet, setShowPortlet] = useState(false);
    const [firstContentfulPaint, setfirstContentfulPaint] = useState(0);
    const [largestContentfulPaint, setlargestContentfulPaint] = useState(0);
    const [cumulativeLayoutShift, setcumulativeLayoutShift] = useState(0);
    const [serverResponse, setserverResponse] = useState(0);
    const [allPageContentLoaded, setallPageContentLoaded] = useState(0);
    const [allPageScriptComplete, setallPageScriptComplete] = useState(0);
    const [downloadPageSpeed, setdownloadPageSpeed] = useState(0);
    const [downloadPageSpeedBreakdown, setdownloadPageSpeedBreakdown] = useState(0);
    const [downloadPageSizeHtml, setdownloadPageSizeHtml] = useState(0);
    const [downloadPageSizeCss, setdownloadPageSizeCss] = useState(0);
    const [downloadPageSizeJs, setdownloadPageSizeJs] = useState(0);
    const [downloadPageSizeImages, setdownloadPageSizeImages] = useState(0);
    const [downloadPageSizeFont, setdownloadPageSizeFont] = useState(0);
    const [downloadPageSizeOther, setdownloadPageSizeOther] = useState(0);
    const [numberOfResources, setNumberOfResources] = useState(0);
    const [numberOfResourcesHtml, setNumberOfResourcesHtml] = useState(0);
    const [numberOfResourcesCss, setNumberOfResourcesCss] = useState(0);
    const [numberOfResourcesScript, setNumberOfResourcesScript] = useState(0);
    const [numberOfResourcesImages, setNumberOfResourcesImages] = useState(0);
    const [numberOfResourcesOther, setNumberOfResourcesOther] = useState(0);
    const [seoTitle, setSeoTitle] = useState(0);
    const [seoTitleLenght, setSeoTitleLenght] = useState(0);
    const [seoDescription, setSeoDescription] = useState(0);
    const [seoH1Heading, setSeoH1Heading] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downlaodActive, setDownloadActive] = useState(true);
    const [showPdf, setShowPdf] = useState(false);
    const [showh2, toggleShowh2] = React.useState(false);
    const [showh3, toggleShowh3] = React.useState(false);
    const [showh4, toggleShowh4] = React.useState(false);
    const [showh5, toggleShowh5] = React.useState(false);
    const [showh6, toggleShowh6] = React.useState(false);
    const [OnPageSEO, setOnPageSEO,] = useState(null);
    const detailsRef = useRef(null);

    const scores = [
        { label: 'SEO', value: totalSeoScore },
        { label: 'Performance', value: sitePerformance },
        { label: 'Social', value: socialLinkPercentage },
        { label: 'Usability', value: averageUsability }
    ];

    const getGaugeLabel = (value) => {
        if (value >= 80) return { label: 'Good', color: 'green' };
        if (value >= 50) return { label: 'Average', color: 'orange' };
        return { label: 'Poor', color: 'red' };
    };

    const getSeoCategory = (score) => {
        if (score >= 80) return 'Good';
        if (score >= 60) return 'Average';
        if (score >= 40) return 'Poor';
        return 'Fail';
    };

    const getSeoColor = (score) => {
        if (score >= 80) return 'rgba(0, 128, 0, 0.3)';
        if (score >= 60) return 'rgba(255, 165, 0, 0.3)';
        if (score >= 40) return 'rgba(237, 2, 5, 0.3)';
        return 'Fail';
    };


    const getSeoShade = (score) => {
        if (score >= 80) return 'rgba(0, 128, 0, 0.3)';
        if (score >= 60) return 'rgba(255, 165, 0, 0.3)';
        if (score >= 40) return 'rgba(237, 2, 5, 0.3)';
        return 'Fail';
    };


    const seoCategory = getSeoCategory(totalSeoScore);
    const performanceCategory = getSeoCategory(sitePerformance);
    const socialCategory = getSeoCategory(socialLinkPercentage);
    const usabilityCategory = getSeoCategory(averageUsability);
    const seoColor = getSeoColor(totalSeoScore);
    const performanceColor = getSeoColor(sitePerformance);
    const socialColor = getSeoColor(socialLinkPercentage);
    const usabilityColor = getSeoColor(averageUsability);
    const seoShade = getSeoShade(totalSeoScore);
    const performanceShade = getSeoShade(sitePerformance);
    const socialShade = getSeoShade(socialLinkPercentage);
    const usabilityShade = getSeoShade(averageUsability);

    const apiEndpoints = [
        '/api/checkMetaTags', // 0
        '/api/checkHeadings', // 1
        '/api/wordchecker', // 2
        '/api/checkCanonical', // 3
        '/api/checkRobotsTxt', // 4
        '/api/checkSitemap', // 5
        '/api/checkAltTags', // 6
        '/api/checkSchema', // 7
        '/api/checkSocialLinks', // 8
        '/api/checkFavicon', // 9
        '/api/checkOgTags', // 10
        '/api/checkNoindex', // 11
        '/api/checkHttpHttps', // 12
        '/api/checkBrokenLinks', // 13
        '/api/checkLinks', // 14
        '/api/checkWwwConsistency', // 15
        '/api/checkRedirects', // 16
        '/api/getGooglePageSpeedScore', // 17
        // '/api/checkdapa' // 18
    ];


    const [openDropdowns, setOpenDropdowns] = useState(
        apiEndpoints.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
    );

    const toggleDropdown = (index) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        setTotalRequests(apiEndpoints.length);
    }, [apiEndpoints]);

    useEffect(() => {
        if (totalRequests > 0) {
            const percentage = (completedRequests / totalRequests) * 100;
            setProgressPercentage(percentage);
        }
    }, [completedRequests, totalRequests]);

    const takeScreenshot = async () => {
        try {
            const screenshotApiUrl = `https://api.screenshotmachine.com/?key=050410&url=${url}&dimension=1024x768`;
            const moblieScreenshortUrl = `https://api.screenshotmachine.com/?key=050410&url=${url}&device=phone&dimension=480x800`;
            const tabletScreenshortUrl = `https://api.screenshotmachine.com/?key=050410&url=${url}&&device=tablet&dimension=800x1280`;
            setScreenshotUrl(screenshotApiUrl);
            setmoblieScreenshortUrl(moblieScreenshortUrl);
            settabletScreenshortUrl(tabletScreenshortUrl);
            setOnPageSEO(response.data.overall_score);
        } catch (error) {
            console.error('Error fetching screenshot:', error);
            // setError('Failed to fetch screenshot.');
        } finally {
            setLoading(true);
        }
    };

    let socialLinksCount = 0;

    const [showDetails, setShowDetails] = useState({
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false
    });

    const toggleShow = (tag) => {
        setShowDetails(prevState => ({
            ...prevState,
            [tag]: !prevState[tag]
        }));
        setTimeout(() => {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 800);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const violation = document.getElementById("content-to-print");
        if (violation) {
            window.scrollTo({
                top: violation.offsetTop,
                behavior: "smooth"
            });
        } else {
            console.error("Element with ID 'content-to-print' not found.");
        }


        setError('');
        setResults([]);
        setCompletedRequests(0);
        setTotalTrueResponses(0);
        setLoading(true);
        setShowPortlet(true);

        if (!url) {
            setError('URL is required.');
            setLoading(false);
            return;
        }

        await takeScreenshot();

        try {
            let responsesCount = 0;
            let trueResponsesCount = 0;
            let socialLinksCount = 0;
            let destopspeedCount = 0;
            let averageUsabilityCount = 0;
            let totalOnPageSeoCount = 0;
            let totalTechnicalSeoCount = 0;

            for (const endpoint of apiEndpoints) {
                const response = await axios.post(endpoint, { url });

                const seoApis = [
                    'Meta title meta description',//
                    'Heading tags',//
                    'wordchecker', //
                    'Canonical Tags', //
                    'Robots.txt', //
                    'Sitemap.xml check', //
                    'Alt Tags Check', //
                    'Schema Check', //
                    'Social Links Check', //
                    'Favicon check', //
                    'OG Tags', //
                    'Noindex Tag Check', //
                    'HTTP/HTTPS Check', //
                    'Broken Links Check', //
                    'Internal/External Links Check', //
                    'www vs non-www Links Check', //
                    'Redirects Check', //
                ];

                const onPageSeo = [
                    'Meta title meta description',//
                    'Heading tags',//
                    'Canonical Tags', //
                    'Robots.txt', //
                    'Sitemap.xml check', //
                    'Social Links Check', //
                    'Favicon check', //
                    'Noindex Tag Check', //
                    'Redirects Check', //
                ];

                const technicalSeo = [
                    'wordchecker', //
                    'Alt Tags Check', //
                    'Schema Check', //
                    'OG Tags', //
                    'HTTP/HTTPS Check', //
                    'Broken Links Check', //
                    'Internal/External Links Check', //
                    'www vs non-www Links Check', //
                ];

                for (const seoApisInfo of seoApis) {
                    if (response.data.info == seoApisInfo) {
                        if (response.data.errors == false) {
                            trueResponsesCount++;
                        } else if (response.data.error == false) {
                            trueResponsesCount++;
                        }

                        if (response.data) {
                            responsesCount++;
                        }
                    }
                }

                for (const onPageSeoApisInfo of onPageSeo) {
                    if (response.data.info == onPageSeoApisInfo) {
                        if (response.data.errors == false) {
                            totalOnPageSeoCount++
                        } else if (response.data.error == false) {
                            totalOnPageSeoCount++;
                        }

                        if (response.data) {
                            responsesCount++;
                        }
                    }
                }

                for (const technicalSeoApisInfo of technicalSeo) {
                    if (response.data.info == technicalSeoApisInfo) {
                        if (response.data.errors == false) {
                            totalTechnicalSeoCount++;
                        } else if (response.data.error == false) {
                            totalTechnicalSeoCount++;
                        }

                        if (response.data) {
                            responsesCount++;
                        }
                    }
                }


                var block = 'block';
                var overallScore = (trueResponsesCount / 17) * 100;
                settotalSeoScore(Math.round(overallScore));

                var onPageScore = (totalOnPageSeoCount / 9) * 100;
                setTotalOnPageSeo(Math.round(onPageScore));

                var technicalSeoScore = (totalTechnicalSeoCount / 8) * 100;
                setTotalTechnicalSeo(Math.round(technicalSeoScore));


                if (response.data.info === "Social Links Check") {
                    socialLinksCount = Array.isArray(response.data.links) ? response.data.links.length : 0;
                }

                console.log(response.data);

                setsocialLinkPercentage(socialLinksCount <= 5 ? (socialLinksCount / 5) * 100 : 100);

                if (response.data.info === "Speed") {
                    destopspeedCount = response.data.data.desktopScore;
                    averageUsabilityCount = response.data.data.averageUsability;
                    setfirstContentfulPaint(response.data.data.usabilityData.first_contentful_paint);
                    setlargestContentfulPaint(response.data.data.usabilityData.largest_contentful_paint);
                    setcumulativeLayoutShift(response.data.data.usabilityData.cumulative_layout_shift);
                    setserverResponse(response.data.data.performanceData.server_response);
                    setallPageContentLoaded(response.data.data.performanceData.all_page_content_loaded);
                    setallPageScriptComplete(response.data.data.performanceData.all_page_script_complete);
                    setdownloadPageSpeed(response.data.data.performanceData.totalPageSize);

                    setdownloadPageSizeHtml(response.data.data.performanceData.breakdown.html);
                    setdownloadPageSizeCss(response.data.data.performanceData.breakdown.css);
                    setdownloadPageSizeJs(response.data.data.performanceData.breakdown.js);
                    setdownloadPageSizeImages(response.data.data.performanceData.breakdown.images);
                    setdownloadPageSizeFont(response.data.data.performanceData.breakdown.font);
                    setdownloadPageSizeOther(response.data.data.performanceData.breakdown.other);

                    setNumberOfResources(response.data.data.performanceData.number_of_resources);
                    setNumberOfResourcesHtml(response.data.data.performanceData.compression_count_html);
                    setNumberOfResourcesCss(response.data.data.performanceData.compression_count_css);
                    setNumberOfResourcesScript(response.data.data.performanceData.compression_count_js);
                    setNumberOfResourcesImages(response.data.data.performanceData.compression_count_image);
                    setNumberOfResourcesOther(response.data.data.performanceData.compression_count_other);
                }

                if (response.data.info === "Meta title meta description") {
                    setSeoTitle(response.data.title1);
                    setSeoTitleLenght(response.data.title1.length)
                    setSeoDescription(response.data.title2);
                }

                if (response.data.info === "Heading tags") {
                    if (response.data.title1.h1 === 1) {
                        setSeoH1Heading(response.data.headings.h1[0]);
                    } else if (response.data.title1.h1 > 1) {
                        setSeoH1Heading('Your page has multiple H1 Header Tag');
                    } else {
                        setSeoH1Heading('Your page does not have an H1 Header Tag.');
                    }
                }

                setAverageUsability(averageUsabilityCount);
                setsitePerformance(destopspeedCount);

                setResult(response.data);
                setResults((prevResults) => [...prevResults, response.data]);
                setCompletedRequests((prev) => prev + 1);
            }

            setTotalTrueResponses(trueResponsesCount);

        } catch (err) {
            setError('Error checking URL. Please try again.');
            console.error(err);
        } finally {

            setLoading(false);
            setShowPortlet(true);
            setDownloadActive(false);
            setShowPdf(true);
        }
    };

    const reportRef = useRef();

    const generatePDF = async () => {
        setIsProcessing(true);
        const input = reportRef.current;

        input.style.width = '1400px';

        await new Promise(resolve => setTimeout(resolve, 1000));

        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.internal.pageSize.height = imgHeight;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
        pdf.save('audit-report.pdf');
        setIsProcessing(false);

        input.style.width = '';
    };

    const truePercentageScore = results.length > 0 ? Math.round((totalTrueResponses / 17) * 100) : 0;





    const ScoreCircles = ({ mobileScore, desktopScore }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15rem', height: '15pc' }}>
                <div style={{ width: 100, height: 200 }}>
                    <h3>Mobile&nbsp;Score</h3>
                    <CircularProgressbar
                        value={mobileScore}
                        maxValue={100}
                        text={`${mobileScore}%`}
                        styles={buildStyles({
                            pathColor: `rgba(62, 152, 199, ${mobileScore / 100})`,
                            textColor: '#3e98c7',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </div>

                <div style={{ width: 100, height: 200 }}>
                    <h3>Desktop&nbsp;Score</h3>
                    <CircularProgressbar
                        value={desktopScore}
                        maxValue={100}
                        text={`${desktopScore}%`}
                        styles={buildStyles({
                            pathColor: `rgba(62, 152, 199, ${desktopScore / 100})`,
                            textColor: '#3e98c7',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </div>
            </div>
        );
    };

    const ScoreCirclesMobile = ({ mobileScore }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15rem', height: '15pc' }}>
                <div style={{ width: 100, height: 200 }}>
                    <CircularProgressbar
                        value={mobileScore}
                        maxValue={100}
                        text={`${mobileScore}%`}
                        styles={buildStyles({
                            pathColor: `rgba(62, 152, 199, ${mobileScore / 100})`,
                            textColor: '#3e98c7',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </div>

            </div>
        );
    };

    const ScoreCirclesDesktop = ({ desktopScore }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15rem', height: '15pc' }}>


                <div style={{ width: 100, height: 200 }}>
                    <CircularProgressbar
                        value={desktopScore}
                        maxValue={100}
                        text={`${desktopScore}%`}
                        styles={buildStyles({
                            pathColor: `rgba(62, 152, 199, ${desktopScore / 100})`,
                            textColor: '#3e98c7',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </div>
            </div>
        );
    };

    const [showMissingAltTags, setShowMissingAltTags] = useState({});

    const toggleShowMissingAltTags = (idx) => {
        setShowMissingAltTags(prevState => ({
            ...prevState,
            [idx]: !prevState[idx]
        }));
    };

    const metrics = {
        first_contentful_paint: firstContentfulPaint
            ? `${firstContentfulPaint}`.trim().replace(/\s*s$/, '')
            : null,
        largest_contentful_paint: largestContentfulPaint
            ? `${largestContentfulPaint}`.trim().replace(/\s*s$/, '')
            : null,
        cumulative_layout_shift: cumulativeLayoutShift,
        server_response: serverResponse,
        all_page_content_loaded: allPageContentLoaded,
        all_page_script_complete: allPageScriptComplete,
        download_page_speed: downloadPageSpeed
    };


    const data = {
        labels: ['HTML', 'CSS', 'JS', 'Images', 'Font', 'Other'],
        datasets: [
            {
                data: [
                    downloadPageSizeHtml,
                    downloadPageSizeCss,
                    downloadPageSizeJs,
                    downloadPageSizeImages,
                    downloadPageSizeFont,
                    downloadPageSizeOther
                ],
                backgroundColor: ['#00cfd1', '#fdd37b', '#f57668', '#af7de2', '#fcb03c'],
                hoverBackgroundColor: ['#00b5b7', '#e6bc63', '#dc5647', '#975dbe', '#d59433']
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} MB`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false
    };



    const plugins = [
        {
            id: 'totalDisplay',
            beforeDraw: (chart) => {
                if (!chart || !chart.ctx) return;
                const { width, height, ctx } = chart;
                ctx.restore();
                const fontSize = (150);
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = 'middle';

                const total = data.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(2);
                const text = `Total ${total} MB`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
    ];

    const totalRecords = {
        'total': numberOfResources,
        'html': numberOfResourcesHtml,
        'css': numberOfResourcesCss,
        'script': numberOfResourcesScript,
        'images': numberOfResourcesImages,
        'other': numberOfResourcesOther
    }

    const renderProgressBarData = {
        html: { size: numberOfResourcesHtml, compressedPercent: 83 },
        css: { size: numberOfResourcesCss, compressedPercent: 85 },
        js: { size: numberOfResourcesScript, compressedPercent: 68 },
        images: { size: numberOfResourcesImages, compressedPercent: 83 },
        other: { size: numberOfResourcesOther, compressedPercent: 0 },
        total: { size: numberOfResources, compressedPercent: 53 },
    };

    const renderResourceItem = (Icon, label, count) => (
        <div style={{ textAlign: 'center', margin: '0 1rem' }}>
            <Icon size={32} />
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{count}</div>
            <div style={{ fontSize: '0.9rem' }}>{label}</div>
        </div>
    );


    const renderProgressBar = (label, color, size, percent) => (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{label}</div>
            <div
                style={{
                    backgroundColor: '#e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '20px',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: `${percent}%`,
                        backgroundColor: color,
                        height: '100%',
                        transition: 'width 0.3s ease-in-out',
                    }}
                >
                </div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.2rem' }}>
                {size} MB ({percent}% Compressed)
            </div>
        </div>
    );


    const numberOfResourcesdata = {
        totalObjects: numberOfResources,
        html: numberOfResourcesHtml,
        css: numberOfResourcesCss,
        js: numberOfResourcesScript,
        images: numberOfResourcesImages,
        other: numberOfResourcesOther
    };



    const renderNumberOResourceItem = (Icon, label, count) => (
        <div style={{ textAlign: 'center', margin: '0 1rem' }}>
            <Icon size={32} />
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{count}</div>
            <div style={{ fontSize: '0.9rem' }}>{label}</div>
        </div>
    );

    const limitScore = (score) => {
        return score > 100 ? 100 : score;
    };

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Get the background color of the audit result section based on the type of audit.
     * @param {string} className - The class name of the audit result section.
     * @returns {string} The background color of the audit result section.
     */
    /*******  8c2b9dc2-7bb6-401e-bd25-9d72aa512b76  *******/
    const getBackgroundColor = (className) => {
        switch (className) {
            case 'onpageseo':
                return '#26A767';
            case 'techseo':

                return '#b90404';
            case 'performance':
                return 'rgb(223 190 19)';

                return '#DE574B';
            case 'performance':
                return '#FFCF4C';

            case 'social':
                return '#007ce3';
            case 'usability':
                return '#00223e';
            default:
                return '#ffffff';
        }
    };

    return (


        <div className='full-section'>
            <section className="contact-p-sec robots-sec redirect meta-title">
                <div className="container animatedParent">
                    <div className="row">
                        <div className="col-md-12 contact-left-col">
                            <form
                                id="contact-form"
                                className="contact-form meta-title"
                                method="post"
                                action="javascript:void(0)"
                                role="form"
                            >
                                <div className="top-btns d-flex justify-content-between align-items-center">
                                    <a id="audit-back-button" href="/free-seo-tools" className="btn-min">Back</a>
                                    <a href={`/api/export-data?url=${url}`} target="_blank" rel="noopener noreferrer" className="download-div border-bottom border-warning" style={{ display: 'block' }}>

                                    </a>
                                    <button
                                        disabled={downlaodActive || isProcessing}
                                        onClick={generatePDF}
                                        className="btn-min"
                                        style={{
                                            background: "#ffd165",
                                            border: "1px solid #ffd165",
                                            padding: "10px",
                                            cursor: downlaodActive || isProcessing ? "not-allowed" : "pointer",
                                            opacity: downlaodActive || isProcessing ? 0.6 : 1,
                                        }}
                                    >
                                        {isProcessing ? "Downloading..." : "Download PDF Report"}
                                    </button>
                                </div>

                                <div className="controls">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <div className="content-col">

                                                    <h1>SEO Audit Tools</h1>
                                                    <p>Ultimate seo tool to boost organic traffic and rankings on Google and other major search engines.</p>

                                                    <h1 className="audit-tool-heading">SEO Audit Tool & Report</h1>
                                                    <p style={{ fontFamily: 'Montserrat, sans-serif' }}>Get a deep dive into your website's performance with our SEO Audit Tool. This powerful tool thoroughly examines your website to identify areas for improvement, helping you optimize your online presence and boost your search engine rankings."

                                                        Let me know if you'd like me to make any further adjustments!</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    {
                        loading && (
                            <div id="progress-container" className='container'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div style={{ width: '100%', backgroundColor: '#ddd', position: 'relative' }}>
                                            <div id="progress-bar" style={{ width: `${progressPercentage}%`, backgroundColor: '#ffd165', height: '30px' }}>
                                                <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: '#000', fontWeight: 'bold' }}>
                                                    Scanning&nbsp;:&nbsp;{Math.round(progressPercentage)}%
                                                </span>

                    {
                        loading && (
                            <>
                                {/* Full-page blocking overlay */}
                                <div style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 9999,  // Make sure it's below your progress bar
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    pointerEvents: 'all',
                                }} />

                                {/* Your existing progress bar */}
                                <div id="progress-container" className='container' style={{
                                    position: 'fixed',
                                    top: '18.6%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 9999,  // Above the overlay
                                    width: '80%',
                                }}>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div style={{ width: '100%', backgroundColor: '#ddd', position: 'relative' }}>
                                                <div
                                                    id="progress-bar"
                                                    style={{
                                                        width: `${progressPercentage}%`,
                                                        backgroundColor: '#ffd165',
                                                        height: '30px',
                                                        transition: 'width 0.3s ease',
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute',
                                                        left: '50%',
                                                        top: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: '#000',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        Scanning&nbsp;:&nbsp;{Math.round(progressPercentage)}%
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>)

                            </>
                        )

                    }

                    <div className="row">
                        <div className="col-md-6 form-side">
                            <p>Enter a URL address and get a Free Website Analysis!</p>
                            <form onSubmit={handleSubmit}>
                                <div className={`alert alert-danger ${error ? 'show-error' : 'hide'}`} role="alert">
                                    {error}
                                </div>
                                <input
                                    id="audit_url"
                                    type="text"
                                    name="audit_url"
                                    className="form-control required-field"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    data-error="Url is required."
                                />
                                <input
                                    type="submit"
                                    id="audit-submit-button"
                                    className="main-btn-too to-in check-meta generate-audit"
                                    value={loading ? 'Audit...' : 'Check!'}
                                    disabled={loading}
                                    style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                                />

                            </form>

                        </div>
                        <div className="col-md-6 chart-side" id="chart-data">
                        </div>
                    </div>
                </div >
            </section >
            <div style={{ display: 'block' }} id="content-to-print">

                <section className="table-data-here">
                    <div className="wrapper">
                        <div className="container">

                            <div id="pdf-info-heading" className="pdf-info-heading">
                                <h1>SEO Analysis Report</h1>
                                <a style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: '500', lineHeight: '22px', textAlign: 'center', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none', margin: '0 auto 15px auto', display: 'block' }} href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                            </div>


                            {results.length < 1 && (
                                <div className="row" style={{ marginTop: 50, padding: 20, backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                    <div className="col-md-12" style={{ padding: 20, backgroundColor: '#f9f9f9' }}>
                                        <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>What is an SEO Audit Tool?</h2>
                                        <p style={{ fontSize: 16, fontWeight: 'normal', marginBottom: 20 }}>Developing a business website is not the big deal in this day and age. But promoting your products and services on that website is a way tougher task. Free SEO Audit Tools on our website assist you to verify whether your website is ready to be ranked by search engines like Google and Bing etc.</p>
                                        <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 40 }}>Key Factors Affecting Website Performance</h3>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}>Website speed</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}>Mobile-friendliness</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}>Broken links</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}>Keyword usage</li>
                                            <li style={{ padding: 10, borderBottom: 'none' }}>On-page and off-page SEO factors</li>
                                        </ul>
                                        <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>How is TEQTOP's SEO Audit Tool Superior?</h2>
                                        <p style={{ fontSize: 16, fontWeight: 'normal', marginBottom: 20 }}>Having spent more than a decade in the search engine optimization and digital marketing industry, we realized the need to develop technology that assists individuals who are not technically inclined. That's why we have developed an easy to use and comprehend Free SEO Audit Tool. Here's why it's different:</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}><strong>Quick Results:</strong> Receive your website's SEO report in seconds.</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}><strong>Easy to Comprehend:</strong> No technical jargon. Just plain feedback and recommendations.</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}><strong>Free to Use:</strong> Check your site as often as you desire free of charge.</li>
                                            <li style={{ padding: 10, borderBottom: '1px solid #ddd' }}><strong>Actionable Insights:</strong> Receive real-world advice for enhancing your site immediately.</li>
                                            <li style={{ padding: 10, borderBottom: 'none' }}><strong>Trusted by Experts:</strong> Our system is created by SEO experts that understand what works.</li>
                                        </ul>
                                        <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Are You Ready to Enhance your site's performance?</h2>
                                        <p style={{ fontSize: 16, fontWeight: 'normal', marginBottom: 20, textAlign: 'center' }}>Utilize our Free SEO Audit tools to enhance your site's performance and ranking on various search engines!</p>
                                    </div>
                                </div>
                            )}


                            {results.length > 0 && (

                                <div id="portlet" className='portlet px-3 py-4 mb-4'>
                                    <div id="pdf-info-heading" className="pdf-info-heading">
                                        <h1>SEO Analysis Report</h1>
                                        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                    </div>
                                    <div className='portlet-header'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <h2>Audit Results for {url}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='portlet-content'>
                                        <div className='scor-ss row'>
                                            <div className='scor-scontent col-lg-6'>
                                                <CircularProgressbar value={truePercentageScore} text={`${Math.round(truePercentageScore)}%`} />
                                                <p className='scor-p-o'>Overall&nbsp;score</p>
                                            </div>
                                            <div className='col-lg-6'>
                                                {screenshotUrl && (
                                                    <div className="mockup-container">
                                                        <div className='mockup-content'>
                                                            <img className="mockupimage" src="https://cdn.pixabay.com/photo/2021/06/03/11/06/apple-macbook-pro-6306818_960_720.png" alt="Computer Mockup" />
                                                            <img className="site-image" src={screenshotUrl} alt="Screenshot" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                        <div className='scor-garde'>
                                            <div className='row'>
                                                {scores.map((score) => {
                                                    const { label, color } = getGaugeLabel(score.value);

                                                    return (
                                                        <div className='col-lg-3 scor-garde-item' key={score.label}>
                                                            <CircularProgressbar
                                                                value={score.value}
                                                                text={label}
                                                                styles={buildStyles({
                                                                    pathColor: color,
                                                                    textColor: '#333',
                                                                    trailColor: '#d6d6d6',
                                                                })}
                                                            />
                                                            <h4>{score.label}</h4>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            )}

                            <div style={{ display: results.length > 0 ? 'block' : 'none' }} className='results-conatiner on-pageseoResults px-3 py-4'>
                                <div className='results-container on-page-seoResults'>
                                    {results.length > 0 && (
                                        <div className='seohaeder'>
                                            <div className='shortDescription'>
                                                <div className='results-loader seo-loader'>
                                                    {scores.filter(score => score.label === 'SEO' && results.length > 0).map((score) => {
                                                        const { label, color } = getGaugeLabel(score.value);
                                                        return (
                                                            <div key={score.label}>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <h2 className='results-heading'>On&nbsp;Page&nbsp;SEO&nbsp;Results</h2>
                                                                    </div>
                                                                </div>
                                                                <div className='row result-content'>
                                                                    <div className='col-lg-3'>
                                                                        <CircularProgressbar
                                                                            value={score.value}
                                                                            text={label}
                                                                            styles={buildStyles({
                                                                                pathColor: color,
                                                                                textColor: '#333',
                                                                                trailColor: '#d6d6d6',
                                                                            })}
                                                                        />
                                                                    </div>
                                                                    <div className='col-lg-9'>
                                                                        <div className='result-title'>Your On-Page SEO needs improvement</div>
                                                                        <div className="result-description">
                                                                            Your page is not well optimized from an On-Page SEO perspective. On-Page SEO is important to ensure Search Engines can understand your content appropriately and help it rank for relevant keywords. You should ensure that HTML Tag Content is completed correctly and align text content to target keywords.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {results.length > 0 && results.map((result, index) => (
                                        <div key={index} className='detailed-result row'>
                                            <div className="col-12">

                                                {result.info === "Meta title meta description" && (
                                                    <div className="
                                                    faq-box row-hidden field-title expandable shadow rounded mt-4 p-4 ">
                                                        <div className="avoid-break-inside">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">Title Tag</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="answer field-value">
                                                                {result.title1 ? (
                                                                    result.title1.length < 50 || result.title1.length > 60 ? (
                                                                        "You have a title tag, but ideally it should be between 50 and 60 characters in length (including spaces)."
                                                                    ) : (
                                                                        "Wow! Your title is between 50 and 60 characters in length (including spaces)."
                                                                    )
                                                                ) : (
                                                                    "Your site is missing a title."
                                                                )}
                                                                <br />
                                                                {result.title1}
                                                                <br />
                                                                Length: {result.title1 ? result.title1.length : 0} characters
                                                                <div className="append2">
                                                                    Title tags are very important for search engines to correctly understand and categorize your content.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Meta title meta description" && (
                                                    <div className="faq-box row-hidden field-description expandable">
                                                        <div className="avoid-break-inside">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">Meta Description Tag</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="answer field-value">
                                                                {result.title2 ? (
                                                                    result.title2.length >= 120 && result.title2.length <= 160 ? (
                                                                        "Chango! Your site has a cool description set for SEO."
                                                                    ) : (
                                                                        "Your meta description should be between 120 and 160 characters."
                                                                    )
                                                                ) : (
                                                                    "Your site appears to be missing a meta description tag."
                                                                )}
                                                                <br />
                                                                {result.title2}
                                                                <br />
                                                                <div className="appen2">
                                                                    A meta description is important for search engines to understand the content of your page, and is often shown as the description text blurb in search results.
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )}

                                                {result.info === "Heading tags" && (
                                                    <div className="faq-box row-hidden field-title expandable" id="headingInfo">
                                                        <div className="avoid-break-inside">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">H1 Tag</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="answer field-value">
                                                                {result.title1.h1 === 1 ? (
                                                                    <>
                                                                        <div>Good! page has one H1 Header Tag:</div>
                                                                        <div>{result.headings.h1[0]}</div>
                                                                    </>
                                                                ) : (
                                                                    <div>Hey! for good seo site should have one h1 tag.</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Heading tags" && (
                                                    <div className="faq-box field-hasHeaders row-hidden expandable">
                                                        <h4 className="question">H2-H6 Header Tag Usage</h4>
                                                        <div className="answer field-value">
                                                            {result.title1.h1 + result.title1.h2 + result.title1.h3 + result.title1.h4 + result.title1.h5 < 0
                                                                ? "Your page is using multiple levels of Header Tags: H2 to H6."
                                                                : "Your page is not making use of multiple levels of Header Tags."}
                                                        </div>

                                                        {/* Table */}
                                                        <table className="table table-striped table-fluid">
                                                            <thead>
                                                                <tr>
                                                                    <th>Header Tag</th>
                                                                    <th>Frequency</th>
                                                                    <th></th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {["h2", "h3", "h4", "h5", "h6"].map(tag => (
                                                                    <tr key={tag}>
                                                                        <td>{tag.toUpperCase()}</td>
                                                                        <td>{result.title1[tag]}</td>
                                                                        <td width="45%" className="volume-bar-wrapper">
                                                                            <div>
                                                                                <span style={{
                                                                                    width: `${(result.title1[tag] / (
                                                                                        result.title1.h2 +
                                                                                        result.title1.h3 +
                                                                                        result.title1.h4 +
                                                                                        result.title1.h5 +
                                                                                        result.title1.h6
                                                                                    )) * 100}%`
                                                                                }}></span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <button className="heading-toggle-btn" onClick={() => toggleShow(tag)}>
                                                                                {showDetails[tag] ? "Hide" : "View"}
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                        {/* Show detailed headings when toggled */}
                                                        {["h2", "h3", "h4", "h5", "h6"].map(tag => (
                                                            showDetails[tag] && result.headings[tag] && (
                                                                <table id="showdetails" ref={detailsRef} key={tag} className="table table-striped table-fluid">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: "10%" }}>Tag</th>
                                                                            <th>Value</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {result.headings[tag].map((heading, index) => (
                                                                            <tr key={`${tag}-${index}`}>
                                                                                <td style={{ width: "10%" }}>{tag.toUpperCase()}</td>
                                                                                <td>{heading}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )
                                                        ))}
                                                    </div>
                                                )}

                                                {result.info === "wordchecker" && (
                                                    <>
                                                        <div className="faq-box row-hidden field-title expandable" id="headingInfo">
                                                            <div className="avoid-break-inside">
                                                                <div className="question-heading d-flex m-auto justify-content-between">
                                                                    <h4 className="question" data-wow-delay=".1s">Keyword Consistency</h4>
                                                                    <div className="p-l-0">
                                                                        <div className="widget-bg-color-icon">
                                                                            <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                                <i className="md"></i>
                                                                            </div>
                                                                            <div className="clearfix"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="answer field-value">
                                                                    {result.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="faq-box field-keywords row-hidden expandable" id="keywords49514534" style={{ display: "block" }}>
                                                            <div className="field-value-tables">
                                                                <div className="answer keywords field-value-table avoid-break-inside">
                                                                    <div className="chart-title avoid-break-after">Individual Keywords</div>
                                                                    <div className="table-responsive">
                                                                        <table className="table table-striped table-fluid table-part">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Keyword</th>
                                                                                    <th>Title</th>
                                                                                    <th>Meta Description Tag</th>
                                                                                    <th>Headings Tags</th>
                                                                                    <th>Page Frequency</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {result.frequent_keywords.map((word, index) => (
                                                                                    <tr key={`word-${index}`}>
                                                                                        <td>{word.keyword}</td>
                                                                                        <td>{word.title}</td>
                                                                                        <td>{word.meta_description}</td>
                                                                                        <td>{word.headings}</td>
                                                                                        <td><span style={{ width: '100%' }}></span>{word.frequency}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="answer phrases field-value-table avoid-break-inside">
                                                                    <div className="chart-title avoid-break-after">Phrases</div>
                                                                    <div className="table-responsive">
                                                                        <table className="table table-striped table-fluid table-part">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Phrase</th>
                                                                                    <th>Title</th>
                                                                                    <th>Meta Description Tag</th>
                                                                                    <th>Headings Tags</th>
                                                                                    <th>Page Frequency</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {result.frequent_phrases.map((word, index) => (
                                                                                    <tr key={`word-${index}`}>
                                                                                        <td>{word.phrase}</td>
                                                                                        <td>{word.title}</td>
                                                                                        <td>{word.meta_description}</td>
                                                                                        <td>{word.headings}</td>
                                                                                        <td><span style={{ width: '100%' }}></span>{word.frequency}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="append2 row">
                                                                Generally a page should be targeted to rank for particular set of keywords or phrases. These
                                                                keywords should be used with some consistency in page content (naturally and without stuffing) to maximize
                                                                ranking potential for those keywords. This means these keywords should be present across the most important
                                                                HTML tags of the page, and used with some frequency in the general page text content. The keyword
                                                                consistency check illustrates the keywords we have identified appearing most frequently in these areas.<br /><br />
                                                                If the keywords and phrases identified don't match your intended ranking keywords, and do not
                                                                show a level of consistency, you should consider amending your core page content to better include these.

                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                {result.info === "wordchecker" && (
                                                    <div className="avoid-break-inside bg-white rounded shadow-sm">
                                                        <div className="col-12">
                                                            <div className="question-heading d-flex align-items-center justify-content-between mb-3">
                                                                <h4 className="question" data-wow-delay=".1s">Total words</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.totalWordCounterror ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field-answer answer field-value text-muted">
                                                                {result.totalWordCountmessage}
                                                                <br />
                                                                <div className="font-weight-bold text-dark">
                                                                    Word Count: {result.total_word_count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                                {result.info === "Alt Tags Check" && (
                                                    <div className="faq-box row-hidden field-hasImageWithoutAlt expandable" id="hasImageWithoutAlt49514534" style={{ display: "block" }}>
                                                        <div className="js-header-place"></div>
                                                        <div className="avoid-break-inside">
                                                            <div className="question-heading d-flex align-items-center justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">Alt tags check</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field-answer answer field-value text-muted">
                                                            {result.title1}
                                                        </div>
                                                        <div className="field-details"></div>
                                                        <div className="append2 row">
                                                            Alternate Image Text or Alt Text is descriptive text that is displayed in place of an image if it can't be loaded, as well as a label on an image when it is moused over in the browser, to give more information to the visitor. Additionally, Search Engines use provided Alt Text to better understand the content of an image. Image SEO is not widely known, but having your image rank for image searches is an overlooked way of gaining traffic and backlinks to your site.
                                                            <br />
                                                            We recommend adding useful and keyword rich Alt Text for pages's main images, in particular those that could have ranking potential. This should be considered on a case-by-case basis. Often there may be imagery such as UI components or tracking pixels where it may not be useful to add Alt Text, though we have tried to filter a number of these out in our analysis.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Canonical Tags" && (
                                                    <div className="faq-box field-canonicalCheck avoid-break-inside p-3 bg-white rounded shadow-sm">
                                                        <div className="align-items-center">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">Canonical Tag</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.error ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field-answer answer field-value text-muted">
                                                                {result.title1}
                                                            </div>
                                                        </div>


                                                        {/* Canonical Info Section */}
                                                        <div className="append2 row">
                                                            The Canonical Tag is an HTML tag that tells search engines the **primary URL** of a page. URLs can have multiple versions (e.g., parameters, www vs. non-www), which can lead to **duplicate content**. Google recommends adding a Canonical Tag to prevent this.
                                                            <br />
                                                            You should determine the **primary version** of the page. Many CMS platforms handle this automatically, but some require manual configuration.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Noindex Tag Check" && (
                                                    <div className="faq-box field-hasNoindexTags avoid-break-inside p-3 bg-white rounded shadow-sm mt-4">
                                                        <div className="align-items-center">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">No Index Tag</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.error ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field-answer answer field-value text-muted">
                                                                {result.title1}
                                                            </div>

                                                        </div>

                                                        {/* Noindex Info Section */}
                                                        <div className="append2 row">

                                                            Ensuring that a page can be accessed by search engines is **critical** for ranking. The Noindex Tag prevents indexing and can harm ranking ability. While some pages use it intentionally, it is often left over from themes, templates, or development stages.
                                                            <br />
                                                            If you want this page to rank, **remove the Noindex Tag** from the HTML. This might require **editing the frontend HTML** or adjusting CMS settings.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}


                                                {result.info === "HTTP/HTTPS Check" && (
                                                    <div className="faq-box row-hidden field-hasHttpsRedirect expandable" id="hasHttpsRedirect49514534" style={{ display: "block" }}>
                                                        <div className="js-header-place"></div>
                                                        <div className="avoid-break-inside">
                                                            <div className="question-heading d-flex m-auto justify-content-between">
                                                                <h4 className="question" data-wow-delay=".1s">HTTPS Redirects</h4>
                                                                <div className="p-l-0">
                                                                    <div className="widget-bg-color-icon">
                                                                        <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                            <i className="md"></i>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field-answer answer field-value text-muted">
                                                            {result.title1}
                                                        </div>
                                                        <div className="append2 row">
                                                            SSL is a security technology which ensures sensitive data like passwords and credit cards are sent securely between your website and visitors. If you have SSL enabled, it is also very important to ensure that your page is actually forcing usage of HTTPS by redirecting from a non-secure HTTP version to secure HTTPS version. Not doing this means users and Search Engines may continue to access insecure versions, which can also reduce your ranking ability.
                                                            <br />
                                                            Often systems like Wix or Shopify will make it easy to enable, and redirect to SSL versions. If you have Wordpress, or a custom built site, you may require a developer's involvement to ensure that pages are being redirected to their new HTTPS versions. This can be done within a site's configuration or htaccess rules.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Robots.txt" && (
                                                    <div className="faq-box row-hidden field-hasRobotsTxt avoid-break-inside expandable" id="hasRobotsTxt49531437" style={{ display: "block" }}>
                                                        <div className="js-header-place"></div>
                                                        <div className="question-heading d-flex m-auto justify-content-between">
                                                            <h4 className="question" data-wow-delay=".1s">Robots File</h4>
                                                            <div className="p-l-0">
                                                                <div className="widget-bg-color-icon">
                                                                    <div className={`bg-icon pull-left pull-right-pdf ${result.errors ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                        <i className="md"></i>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field-answer answer field-value text-muted">
                                                            {result.title1}
                                                        </div>

                                                        {/* HTTPS Info Section */}
                                                        <div className="append2 row">
                                                            Ensuring that a page can be accessed by search engines is **critical** for ranking. The Noindex Tag prevents indexing and can harm ranking ability. While some pages use it intentionally, it is often left over from themes, templates, or development stages.
                                                            <br />
                                                            If you want this page to rank, **remove the Noindex Tag** from the HTML. This might require **editing the frontend HTML** or adjusting CMS settings.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}

                                                {result.info === "Sitemap.xml check" && (
                                                    <div className="faq-box row-hidden field-hasSitemap avoid-break-inside expandable" id="hasSitemap49531437" style={{ display: "block" }}>
                                                        <div className="js-header-place"></div>
                                                        <div className="question-heading d-flex m-auto justify-content-between">
                                                            <h4 className="question" data-wow-delay=".1s">XML Sitemap</h4>
                                                            <div className="p-l-0">
                                                                <div className="widget-bg-color-icon">
                                                                    <div className={`bg-icon pull-left pull-right-pdf ${result.error ? 'bg-icon-danger' : 'bg-icon-success'}`}>
                                                                        <i className="md"></i>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="field-answer answer field-value text-muted">
                                                            {result.title1}
                                                        </div>

                                                        <div className="append2 row">
                                                            A Sitemap is an XML data file on your site that lists all of your site's pages that are available for crawling together with other useful information like last update times and crawling priority. Sitemap files help Search Engines find all your pages to give them the highest chance of being indexed and ranked.
                                                            <br />
                                                            We recommend always having a Sitemaps file in place for your site. Sitemaps can be created manually using a utility, Wordpress plugin, or your CMS's Sitemap creation process. Additionally, the Sitemap should be referenced in your robots.txt file.
                                                            <br />
                                                            {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                                Learn more in our guide
                                                            </a> */}
                                                            <br />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: results.length > 0 ? 'block' : 'none' }} className='result-conatiner usability  px-3 py-4'>
                                {results.length > 0 && (
                                    <div className='section'>
                                        <div className='section-header'>
                                            <div className='results-loader usability'>
                                                {scores.filter(score => score.label === 'Usability' && results.length > 0).map((score) => {
                                                    const { label, color } = getGaugeLabel(score.value);
                                                    return (
                                                        <div key={score.label}>
                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <h2 className='results-heading'>Usability</h2>
                                                                </div>
                                                            </div>
                                                            <div className='row result-content'>
                                                                <div className='col-lg-3'>
                                                                    <CircularProgressbar
                                                                        value={score.value}
                                                                        text={label}
                                                                        styles={buildStyles({
                                                                            pathColor: color,
                                                                            textColor: '#333',
                                                                            trailColor: '#d6d6d6',
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className='col-lg-9 score-info-wrapper'>
                                                                    <h3 className="font-600 ui-score-message">Your usability could be better</h3>
                                                                    <div className="ui-score-description">Your page is OK but could be more usable across devices. Usability is important to maximize your available audience and minimize user bounce rates (which can indirectly affect your search engine rankings).</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className='result-heading'>
                                                <div className="row">
                                                    <div className="col-12 btn-do-it-for-me-column">
                                                        <a type="button" className="btn btn-lg btn-warning btn-do-it-for-me" href="#" >Need help with your SEO?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='result-section'>
                                            <div className="section-heading row">
                                                <div className="col-12">
                                                    <h4 className="question" data-wow-delay=".1s">Device Rendering</h4>
                                                    <div className="answer field-value">This check visually demonstrates how your page renders on different devices. It is important that your page is optimized for mobile and tablet experiences as today the majority of web traffic comes from these sources.</div>
                                                </div>
                                            </div>
                                            <div className='section-content'>
                                                <div className="rendering-images col-lg-12 col-md-12 col-sm-12 col-xs-12"><div className="row">
                                                    <div className="col-screenshot-mobile col-md-4">
                                                        <div className="screenshot mobile" style={{ WebkitUserSelect: 'none', backgroundImage: 'url(./images/mobile.png)!important' }}>
                                                            <div className="screenshot-img-container">
                                                                <img src={moblieScreenshortUrl} />
                                                            </div>
                                                            <h2>Mobile Screenshot</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-screenshot-tablet col-md-5 padding-0">
                                                        <div className="screenshot tablet" style={{ WebkitUserSelect: 'none', backgroundImage: 'url(./images/tablet.png)' }}>
                                                            <div className="screenshot-img-container">
                                                                <img src={tabletScreenshortUrl} />
                                                            </div>
                                                            <h2>Tablet Screenshot</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='result-section'>
                                            <div className="faq-box check-item-first row-hidden field-coreWebVitals expandable" id="coreWebVitals49591097" style={{ display: "block" }}>
                                                <div className="row avoid-break-inside">
                                                    <div className="col-12">
                                                        <h4 className="question" data-wow-delay=".1s">Google's Core Web Vitals</h4>
                                                        <div className="answer field-value field-answer">Google is indicating that they do not have 'sufficient real-world speed data for this page' in order to make a Core Web Vitals assessment. This can occur for smaller websites or those that are not crawl-able by Google.</div>
                                                    </div>
                                                    <div className="col-xs-1 p-l-0">
                                                        <div className="widget-bg-color-icon">
                                                            <div className="bg-icon pull-left pull-right-pdf bg-icon-inverse">
                                                                <i className="md"></i>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 charts-special">
                                                        <h1>Performance Metrics</h1>
                                                        <div>
                                                            <h2>First Contentful Paint</h2>
                                                            <ReactSpeedometer
                                                                value={metrics.first_contentful_paint}
                                                                minValue={0}
                                                                maxValue={10}
                                                                needleColor="red"
                                                                startColor="green"
                                                                segments={10}
                                                                endColor="yellow"
                                                                textColor="black"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Largest Contentful Paint</h2>
                                                            <ReactSpeedometer
                                                                value={metrics.largest_contentful_paint}
                                                                minValue={0}
                                                                maxValue={10}
                                                                needleColor="red"
                                                                startColor="green"
                                                                segments={10}
                                                                endColor="yellow"
                                                                textColor="black"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2>Cumulative Layout Shift</h2>
                                                            <ReactSpeedometer
                                                                value={metrics.cumulative_layout_shift}
                                                                minValue={0}
                                                                maxValue={1}
                                                                needleColor="red"
                                                                startColor="green"
                                                                segments={5}
                                                                endColor="yellow"
                                                                textColor="black"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="check-info row">
                                                    <div className='col-12'>
                                                        <p className="what">Core Web Vitals are UI Metrics designed by Google that measure the overall quality of user experience on your site. They assess things such as the appearance of content, interactivity of the page and visual stability from the moment of page load. Core Web Vitals are gathered from real world usage data of a website (hence some smaller websites that haven't been well sampled may not return an appropriate result). Google has made Core Web Vitals a ranking factor for pages with increasing importance.</p>
                                                        <p className="how">To improve your Core Web Vitals scores, you may need to read Google's documentation on the topic and follow the recommendations provided in the Google's PageSpeed Insights assessment.</p>
                                                        {/* <a href="/blog/canonical-url/" target="_blank" className="text-primary">
                                                            Learn more in our guide
                                                        </a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='result-section'>
                                            <div className='section-content'>
                                                <div className="faq-box row-hidden field-hasMobileViewports avoid-break-inside expandable" id="hasMobileViewports49591097" style={{ display: "block" }}>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="question" data-wow-delay=".1s">Use of Mobile Viewports</h4>
                                                            <div className="answer field-value">Your page specifies a viewport matching the device's size, allowing it to render appropriately across devices.</div>
                                                        </div>

                                                    </div>
                                                    <div className="check-info row" style={{ display: "block" }}>
                                                        <div className='col-12'>
                                                            <p className="what">The Viewport is a Meta Tag within the page's HTML which gives the browser instructions for how to control the page's dimensions and scaling. Setting the Viewport is particularly important for mobile and tablet device responsiveness, as without it, the page can appear incorrectly sized and require zooming or scrolling to view content.</p><p className="how">Make sure you include one Meta Viewport tag in the Head section of page HTML.</p>
                                                            {/* <p className="more-info"><a href="#" target="_blank">Learn more in our guide</a></p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='result-section'>
                                            <div className='section-content'>
                                                <div className="faq-box row-hidden field-mobilePageInsights  expandable" id="mobilePageInsights49591097" style={{ display: "block" }}>
                                                    <div className="avoid-break-inside">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <h4 className="question" data-wow-delay=".1s">Google's PageSpeed Insights - Mobile</h4>
                                                                <div className="answer field-value">Google is indicating that your page is scoring poorly on their Mobile PageSpeed Insights evaluation.<br /><br />Note that this evaluation is being performed from US servers and the results may differ slightly from an evaluation carried out from Google's PageSpeed Web Interface as that reporting localizes to the region in which you are running the report.<div className="append2">Google has indicated that the performance of a webpage is becoming more important from a user and subsequently ranking perspective.</div></div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="field-details avoid-break-inside m-t-20 row" id="insights-tables-mobile"><div className="col-lg-6 col-sm-12"><div className='table-container'>
                                                        <table className="table table-striped table-fluid">
                                                            <thead>
                                                                <tr>
                                                                    <th>Lab Data</th>
                                                                    <th>Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>First Contentful Paint</td>
                                                                    <td style={{ color: '#c43807' }}>{metrics.first_contentful_paint} s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Speed Index</td>
                                                                    <td style={{ color: "#008800" }}>{metrics.server_response} ms</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Largest Contentful Paint</td>
                                                                    <td style={{ color: "#c43807" }}>{metrics.largest_contentful_paint} s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Time to Interactive</td>
                                                                    <td style={{ color: "#c43807" }}>{Math.round(metrics.all_page_content_loaded)} ms</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Blocking Time</td>
                                                                    <td style={{ color: "#008800" }}>0.03 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Cumulative Layout Shift</td>
                                                                    <td style={{ color: "#008800" }}>{metrics.cumulative_layout_shift} s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    </div>
                                                        <div className='col-lg-6 col-sm-12'>
                                                            <div className='table-container'>
                                                                <table className="table table-striped table-fluid">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Opportunities</th>
                                                                            <th>Estimated Savings</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Avoid multiple page redirects</td>
                                                                            <td style={{ color: '#cc0000' }}>0.63 s</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="append2 row">
                                                        <div className='col-12'>
                                                            <p className="what">PageSpeed Insights is a tool from Google that evaluates a website's performance in both mobile and desktop, providing suggestions for how to improve it. Google has indicated that performance is becoming a more important ranking factor, so understanding Google's own analysis of your site is valuable. Also irrespective of SEO rankings, it has been well researched that pages that load faster perform better in user bounce rate and conversions.</p><p className="how">We recommend reviewing and implementing some of Google's listed opportunities to improve your site.</p>
                                                        </div>
                                                    </div></div>
                                            </div>
                                        </div>
                                        <div className='result-section'>
                                            <div className="faq-box row-hidden field-desktopPageInsights expandable" id="desktopPageInsights49591097" style={{ display: "block" }}>
                                                <div className="avoid-break-inside">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="question" data-wow-delay=".1s">Google's PageSpeed Insights - Desktop</h4>
                                                            <div className="answer field-value">Google is indicating that your page is scoring well on their Desktop PageSpeed Insights evaluation.</div>
                                                        </div>

                                                    </div>
                                                    <div className='results-loader performance'>
                                                        {scores.filter(score => score.label === 'Performance' && results.length > 0).map((score) => {
                                                            const { label, color } = getGaugeLabel(score.value);
                                                            return (
                                                                <div key={score.label} style={{ width: '150px', textAlign: 'center' }}>
                                                                    <h2 className='results-heading'>Usability</h2>
                                                                    <CircularProgressbar
                                                                        value={score.value}
                                                                        text={label}
                                                                        styles={buildStyles({
                                                                            pathColor: color,
                                                                            textColor: '#333',
                                                                            trailColor: '#d6d6d6',
                                                                        })}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="field-details avoid-break-inside m-t-20 row" id="insights-tables-desktop"><div className="col-lg-6 col-sm-12"><table className="table table-striped table-fluid"><thead><tr><th>Lab Data</th><th>Value</th></tr></thead><tbody><tr><td>First Contentful Paint</td><td style={{ color: '#008800' }}>0.8 s</td></tr><tr><td>Speed Index</td><td style={{ color: '#008800' }}>0.9 s</td></tr><tr><td>Largest Contentful Paint</td><td style={{ color: "#008800" }}>0.9 s</td></tr><tr><td>Time to Interactive</td><td style={{ color: "#008800" }}>1 s</td></tr><tr><td>Total Blocking Time</td><td style={{ color: "#008800" }}>0 s</td></tr><tr><td>Cumulative Layout Shift</td><td style={{ color: "#008800" }}>0.003</td></tr></tbody></table></div><div className="col-lg-6 col-sm-12"><div className='table-container'><table className="table table-striped table-fluid"><thead><tr><th>Opportunities</th><th>Estimated Savings</th></tr></thead><tbody><tr><td>Avoid multiple page redirects</td><td style={{ color: '#cc0000' }}>0.19 s</td></tr></tbody></table></div></div></div>
                                                <div className="check-info row">
                                                    <div className='col-12'>
                                                        <p className="what">PageSpeed Insights is a tool from Google that evaluates a website's performance in both mobile and desktop, providing suggestions for how to improve it. Google has indicated that performance is becoming a larger ranking factor, so understanding Google's own analysis of your site is valuable. Also irrespective of SEO rankings, it has been well researched that pages that load faster perform better in user bounce rate and conversions.</p><p className="how">We recommend reviewing and implementing some of Google's listed opportunities to improve your site.</p>
                                                    </div></div></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: results.length > 0 ? 'block' : 'none' }} className='result-container performance px-3 py-4'>
                                {results.length > 0 && result.info == "Speed" && (
                                    <div className='container-content '>
                                        <div className="portlet-heading bg-brown avoid-break-inside row">
                                            <div className='col-12'>
                                                <h2 className="section-title">Performance Results</h2>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                        <div className='results-loader performance'>
                                            <div className='row'>
                                                <div className='ploader col-lg-3'>
                                                    {scores.filter(score => score.label === 'Performance' && results.length > 0).map((score) => {
                                                        const { label, color } = getGaugeLabel(score.value);
                                                        return (
                                                            <div key={score.label} style={{ width: '150px', textAlign: 'center' }}>
                                                                <h2 className='results-heading'>Usability</h2>
                                                                <CircularProgressbar
                                                                    value={score.value}
                                                                    text={label}
                                                                    styles={buildStyles({
                                                                        pathColor: color,
                                                                        textColor: '#333',
                                                                        trailColor: '#d6d6d6',
                                                                    })}
                                                                />
                                                            </div>
                                                        );
                                                    })}

                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="score-info-wrapper">
                                                        <h3 className="font-600 performance-score-message">Your performance is good</h3>
                                                        <div className="performance-score-description">Your page has performed well in our testing meaning it should be reasonably responsive for your users, but there is still room for improvement. Performance is important to ensure a good user experience, and reduced bounce rates (which can also indirectly affect your search engine rankings).</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="portlet-body">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-6 col-xs-12 pdf-third" id="speedchart"></div>
                                                </div>
                                                <div style={{ padding: '0 36px' }}>
                                                    <div className="row" id="speedchart-competitor">
                                                        <div className="col-md-4 col-sm-6 col-xs-12 pdf-third"></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-12 pdf-half" id="sizechart"></div>
                                                </div>
                                                <div style={{ padding: '0 36px' }}>
                                                    <div className="row" id="sizechart-competitor">
                                                        <div className="col-md-6 col-sm-6 col-xs-12 pdf-half"></div>
                                                    </div>
                                                </div>

                                                <div className="row-hidden check-group" style={{ display: 'block' }}>
                                                    <div className="faq-box page-speed check-item-first row-hidden field-serverResponseTime">
                                                        <div className="row avoid-break-inside">
                                                            <div className="question-heading d-flex align-items-center justify-content-between mb-3">
                                                                <h4 className="question" data-wow-delay=".1s">Page Speed Info</h4>
                                                            </div>
                                                            <div className="field-answer answer field-value text-muted">
                                                                {result.data.desktopScore}
                                                            </div>
                                                        </div>
                                                        <div className="charts"></div>
                                                        <div className="faq-box page-speed check-item-first row-hidden field-serverResponseTime expandable" id="serverResponseTime50346487" style={{ display: 'block' }}>
                                                            <div className="row avoid-break-inside">
                                                                <div className="col-lg-11">

                                                                    <div className="answer field-value field-answer">Your page loads in a reasonable amount of time.</div>
                                                                </div>

                                                            </div>
                                                            {/* <div style={{display: 'none'}} className="charts row"><div className="col-12">
                                                            <div className="pdf-third">
                                                                <div className="avoid-break-inside text-center">
                                                                    <div className="chart-title avoid-break-after">Server Response</div>
                                                                    <ReactSpeedometer
                                                                        value={metrics.server_response}
                                                                        minValue={0}
                                                                        maxValue={1000} // adjust as needed based on acceptable CLS
                                                                        needleColor="red"
                                                                        startColor="green"
                                                                        segments={5}
                                                                        endColor="yellow"
                                                                        textColor="black"
                                                                        valueFormat='.0f'
                                                                    />                                                                        </div>
                                                            </div>
                                                            <div className="pdf-third">
                                                                <div className="avoid-break-inside text-center">
                                                                    <div className="chart-title avoid-break-after">All Page Content Loaded</div>
                                                                    <ReactSpeedometer
                                                                        value={metrics.all_page_content_loaded} minValue={0}
                                                                        maxValue={15000} // adjust as needed based on acceptable CLS
                                                                        needleColor="red"
                                                                        startColor="green"
                                                                        segments={5}
                                                                        endColor="yellow"
                                                                        textColor="black"
                                                                        valueFormat='.0f'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="pdf-third">
                                                                <div className="avoid-break-inside text-center">
                                                                    <div className="chart-title avoid-break-after">All Page Scripts Complete</div>
                                                                    <ReactSpeedometer
                                                                        value={metrics.all_page_script_complete}
                                                                        minValue={0}
                                                                        maxValue={5000} // adjust as needed based on acceptable CLS
                                                                        needleColor="red"
                                                                        startColor="green"
                                                                        segments={5}
                                                                        endColor="yellow"
                                                                        textColor="black"
                                                                        valueFormat='.0f'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div> */}
                                                            <div className="check-info row" style={{ display: 'block' }}><div className='col-12'><p className="what">Page Load Speed refers to the amount of time it takes to entirely load a webpage in a user's browser. Load speed is complex and  can be impacted by a multitude of factors including network, web server, page size, technology, database or coding problems, and may require the help of a developer or systems administrator to troubleshoot. Page Load Speed impacts a user's experience on a website and can directly impact bounce rate and conversions. Additionally, Search Engines are making Page Load Speed a ranking factor.</p><p className="how">Optimize Page Load Speed by examining common problem points such as overall file size, server resources or coding problems.</p><p className="more-info">
                                                                {/* <a href="/blog/page-speed/" target="_blank">Learn more in our guide</a> */}
                                                            </p>
                                                            </div></div></div>
                                                    </div>

                                                    <div className="row-hidden check-group" style={{ display: 'block' }}>

                                                        <div className="faq-box check-item-first row-hidden field-pageSize expandable" id="pageSize50346487" style={{ display: 'block' }}>
                                                            <div className="row avoid-break-inside">
                                                                <div className="col-lg-11">

                                                                    <div className="answer field-value field-answer">Your page's file size is reasonably low which is good for Page Load Speed and user experience.</div>
                                                                </div>

                                                            </div>
                                                            <div className="charts"><div className="row avoid-break-inside m-t-15">
                                                                <div className="col-lg-6 pdf-half">
                                                                    <div className="avoid-break-inside text-center">
                                                                        <div className="chart-title avoid-break-after">Download Page Size 'Mb'</div>
                                                                        <ReactSpeedometer
                                                                            value={5}
                                                                            minValue={0}
                                                                            maxValue={20}
                                                                            needleColor="red"
                                                                            startColor="green"
                                                                            segments={5}
                                                                            endColor="yellow"
                                                                            textColor="black"
                                                                            valueFormat='.0f'
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 pdf-half">
                                                                    <div className="avoid-break-inside text-center">
                                                                        <div className="chart-title avoid-break-after">Download Page Size Breakdown</div>
                                                                        <div className="chart-container chart-container-doughnut">
                                                                            <Doughnut data={data} options={options} plugins={plugins} style={{ maxHeight: '160px', width: '100%' }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div></div>
                                                            <div className="check-info row"><div className="col-12"><p className="what">Download Page Size refers to the total amount of file content that needs to be downloaded by the browser to view a particular webpage. This includes HTML, CSS, Javascript and Images, though can include a number of other file formats. Generally media files like images and videos are significantly larger than text files and make up the bulk of Download File Size, but also represent the largest optimization opportunity. An important distinction here is 'Download' vs 'Raw' file size. Modern web protocols compress files during transfer, meaning files are usually smaller to download than their actual or 'raw' size. So any manual optimizations you perform would be on the 'raw' file. Download Page Size is one of the biggest contributors to Page Load Speed, which can directly affect rankings, user experience and conversions.</p><p className="how">It is important to ensure your Download File Size is as small as possible by removing unnecessary files and minifying and optimizing others. 5MB is a good metric to strive for, though modern websites are gradually increasing in size.</p>
                                                                {/* <p className="more-info"><a href="/blog/webpage-size/" target="_blank">Learn more in our guide</a></p> */}
                                                            </div></div></div>
                                                    </div>

                                                </div>

                                                <div className="row-hidden check-group" style={{ display: 'block' }}>
                                                    <div className="faq-box check-item-first row-hidden field-hasGzip">
                                                        <div className="row avoid-break-inside">
                                                            <div className="col-lg-11">

                                                                <div className="answer field-value field-answer"></div>
                                                            </div>
                                                            <div className="col-lg-1 p-l-0">
                                                                <div className="widget-bg-color-icon">
                                                                    <div className="bg-icon pull-left pull-right-pdf">
                                                                        <i className="md"></i>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="charts"></div>
                                                    </div><div className="faq-box check-item-first row-hidden field-hasGzip expandable" id="hasGzip50346487" style={{ display: 'block' }}>
                                                        <div className="row avoid-break-inside">
                                                            <div className="col-lg-11">
                                                                <h4 className="question" data-wow-delay=".1s">Website Compression (Gzip, Deflate, Brotli)</h4>
                                                                <div className="answer field-value field-answer">Your website appears to be using a reasonable level of compression.</div>
                                                            </div>

                                                        </div>
                                                        <div className="charts"><div className="row avoid-break-inside m-t-15"><div className="col-lg-6 pdf-half"><div className="avoid-break-inside flex-column"><div className="chart-title avoid-break-after">Compression Rates</div>

                                                            {renderProgressBar('HTML', '#00cfe8', renderProgressBarData.html.size, renderProgressBarData.html.compressedPercent)}
                                                            {renderProgressBar('CSS', '#00e08c', renderProgressBarData.css.size, renderProgressBarData.css.compressedPercent)}
                                                            {renderProgressBar('JS', '#ffa500', renderProgressBarData.js.size, renderProgressBarData.js.compressedPercent)}
                                                            {renderProgressBar('Images', '#8a2be2', renderProgressBarData.images.size, renderProgressBarData.images.compressedPercent)}
                                                            {renderProgressBar('Other', '#ff4d4f', renderProgressBarData.other.size, renderProgressBarData.other.compressedPercent)}
                                                            {renderProgressBar('Total', '#00cfe8', renderProgressBarData.total.size, renderProgressBarData.total.compressedPercent)}

                                                        </div></div><div className="col-lg-6 pdf-half"><div className="m-b-10 visible-xs hidden-pdf"></div><div className="avoid-break-inside text-center"><div className="chart-title avoid-break-after">Raw Page Size Breakdown</div>

                                                            <Doughnut data={data} options={options} plugins={plugins} style={{ maxHeight: '500px', width: '100%' }} />

                                                        </div></div></div></div>
                                                        <div className="check-info row"><div className="col-12"><p className="what">Modern web servers allow website files to be compressed as part of their transfer, often dramatically reducing the Download File Size and Page Load Speed of a page. There are several different compression algorithms used such as GZIP, Deflate and Brotli. Enabling compression can often represent a simple and quick win to performance, and most new web servers will have this enabled by default.</p><p className="how">You should ensure that compression is enabled and working effectively on your web server. Sometimes compression may only be partially enabled for particular file types, or using an older compression method, so it is important to understand whether your server is configured as efficiently as possible. This may require the help of a developer to investigate.</p>
                                                            {/* <p className="more-info"><a href="/blog/webpage-size/" target="_blank">Learn more in our guide</a></p> */}
                                                        </div></div></div>
                                                </div>



                                                <div className="row-hidden check-group" style={{ display: 'block' }}>
                                                    <div className="faq-box row-hidden field-numberOfResources avoid-break-inside">

                                                    </div><div className="faq-box row-hidden field-numberOfResources avoid-break-inside expandable" id="numberOfResources50346487" style={{ display: 'block' }}>
                                                        <div className="row">
                                                            <div className="col-lg-11">
                                                                <h4 className="question" data-wow-delay=".1s">No of resources</h4>
                                                                <div className="widget-bg-color-icon">
                                                                    <div className="bg-icon pull-left pull-right-pdf">
                                                                        <i className="md"></i>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>

                                                            <div className="page-objects-info avoid-break-inside">
                                                                <div className="answer field-value">This check displays the total number of files that need to be retrieved from web servers to load your page.
                                                                    <div className="m-t-25">
                                                                        <div className="activity-item" align="center">
                                                                            <div className="item-image ps-total-resources-image"></div>
                                                                            <div className="item-content">

                                                                                {renderNumberOResourceItem(FaFile, 'Total Objects', numberOfResourcesdata.totalObjects)}
                                                                                {renderNumberOResourceItem(FaHtml5, 'Number of HTML Pages', numberOfResourcesdata.html)}
                                                                                {renderNumberOResourceItem(FaJsSquare, 'Number of JS Resources', numberOfResourcesdata.js)}
                                                                                {renderNumberOResourceItem(FaCss3Alt, 'Number of CSS Resources', numberOfResourcesdata.css)}
                                                                                {renderNumberOResourceItem(FaImage, 'Number of Images', numberOfResourcesdata.images)}
                                                                                {renderNumberOResourceItem(FaEllipsisH, 'Other Resources', numberOfResourcesdata.other)}


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-1 p-l-0">
                                                                <div className="widget-bg-color-icon">
                                                                    <div className="bg-icon pull-left pull-right-pdf bg-icon-inverse">
                                                                        <i className="md"></i>
                                                                    </div>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="check-info row"><div className="col-12"><p className="what">When browsers display a modern website, they have to retrieve a wide variety of files including HTML, CSS, Javascript, Images and other media. As a general rule, every file that needs to be retrieved is another network request that needs to be made by the browser to the server, which can each face some connection overhead and add to Page Load Time.</p><p className="how"> It is a good idea to remove unnecessary files or consolidate smaller files with similar content like styles and scripts where possible to optimize performance.</p></div></div></div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* Advance Info Section */}
                            {/* <div className="advance-info">
                            <div className="header-text">
                                <p>Advance Info</p>
                            </div>
                            {results.length > 0 && results.map((result, index) => (
                                <div key={index} className="box-content">
                                    <h2><img src="images/done.png" alt="" /> Canonical Tags</h2>
                                    <h4>{result.canonicalTags}</h4>
                                    <p>{result.canonicalDescription}</p>
                                </div>
                            ))}
                        </div> */}
                        </div>
                    </div>


                </section >

                {
                    loading && (
                        <div id="site-loader-tool" className="site-loader tools-loader" style={{ display: 'block' }}>
                            <img className="loader" alt="loader" src="/public/assets/images/loader.gif" />
                        </div>
                    )}


            </div>


            <div className='content-to-print-opacity-div'>
                <div ref={reportRef} id="content-to-print content-to-print-opacity">
                    {results.length > 0 && (
                        <div className="container mt-4">
                            <section className="top-header" style={{ paddingTop: '67px' }}>
                                <div className="container">
                                    <div className="header-info">
                                        <h1 style={{ fontFamily: 'Inter', fontSize: '48px', fontWeight: '600', lineHeight: '58.09px', textAlign: 'center', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none', margin: '0 0 15px 0' }}>
                                            SEO Analysis Report
                                        </h1>
                                        <a style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: '500', lineHeight: '22px', textAlign: 'center', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none', margin: '0 auto 15px auto', display: 'block' }} href={url} target="_blank" rel="noopener noreferrer">Report for: {url}</a>
                                    </div>
                                </div>
                            </section>


                            <div className="overview" style={{ paddingTop: '54px' }}>

                            <div className="overview watermarkIn" style={{ paddingTop: '54px' }}>
                                <div id="watermark">

                                </div>

                                <div className="container">
                                    <div className="overview-row">
                                        <div className="overall">
                                            <h2>{truePercentageScore}%</h2>
                                            <p>Overall</p>
                                        </div>
                                        <div className="speed-graph">
                                            <ul className="seo-score-list">
                                                <li className="seo-score-bar">
                                                    <div className="bar-wrapper wrapperBox">
                                                        <div className="bar-fill green" style={{ width: `${totalOnPageSeo}%` }}>
                                                            <span className="bar-label" style={{ color: '#000' }}>On-Page SEO –</span>
                                                        </div>
                                                        <span className='boxNumber' style={totalOnPageSeo < 31 ? { position: 'absolute', left: '210px' } : {}}>{totalOnPageSeo}%</span>
                                                    </div>
                                                </li>

                                                <li className="seo-score-bar">
                                                    <div className="bar-wrapper wrapperBox">
                                                        <div className="bar-fill red" style={{ width: `${totalTechnicalSeo}%` }}>
                                                            <span className="bar-label" style={{ color: '#000' }}>Technical SEO –</span>
                                                        </div>
                                                        <span className='boxNumber' style={totalTechnicalSeo < 33 ? { position: 'absolute', left: '215px' } : {}}>{totalTechnicalSeo}%</span>
                                                    </div>
                                                </li>

                                                <li className="seo-score-bar">
                                                    <div className="bar-wrapper wrapperBox">
                                                        <div className="bar-fill yellow" style={{ width: `${sitePerformance}%` }}>
                                                            <span className="bar-label" style={{ color: '#000' }}>Site Performance –</span>
                                                        </div>
                                                        <span className='boxNumber' style={sitePerformance < 31 ? { position: 'absolute', left: '250px' } : {}}>{sitePerformance}%</span>
                                                    </div>
                                                </li>
                                            </ul>



                                        </div>
                                    </div>
                                </div>
                            </div>


                            <section className="on-page_seo" style={{ marginTop: '50px' }}>

                            <section className="on-page_seo watermarkIn" style={{ marginTop: '50px' }}>
                                <div id="watermark">

                                </div>

                                <div className="container">
                                    <div className="onPageX" style={{ border: '1px solid rgba(0, 0, 0, 0.10)', background: 'rgba(38, 167, 103, 0.10)' }}>
                                        <div className="seo-result">
                                            <h2>On Page SEO Results for <span style={{ color: '#FFCF4C' }}>{results[0]?.url}</span></h2>
                                        </div>
                                        <div className="seo-tool">
                                            {results[0]?.info === "Meta title meta description" && (
                                                <>
                                                    <div className="seo-meta" style={{ marginBottom: '25px' }}>
                                                        <div className="heading">
                                                            <i style={{ boxShadow: '1px 1px 2px' }} className={`fa-solid ${results[0]?.title1 && results[0]?.title1.length >= 50 && results[0]?.title1.length <= 60 ? 'fa-check' : 'fa-times'}`}></i>
                                                            <h2>Meta Title</h2>
                                                        </div>

                                                        <p className="pdf-intro">
                                                            On-Page SEO is important to ensure Search Engines can understand your content appropriately and help it rank for relevant keywords. You should ensure that HTML Tag Content is completed correctly and align text content to target keywords.
                                                        </p>
                                                        <p className='pdf-result'>{results[0]?.title1 || "Your site is missing a title."}</p>
                                                    </div>
                                                    <div className="seo-desc" style={{ marginBottom: '25px' }}>
                                                        <div className="heading">
                                                            <i className={`fa-solid ${results[0]?.title2 && results[0]?.title2.length >= 120 && results[0]?.title2.length <= 160 ? 'fa-check' : 'fa-times'}`}></i>
                                                            <h2>Meta Description</h2>
                                                        </div>
                                                        <p className="pdf-intro">
                                                            A meta description is a short summary that appears below your page title in search results. It helps users understand what your page offers and encourages them to click. Writing a clear, engaging meta description can improve your visibility and drive more traffic.
                                                        </p>
                                                        <p className='pdf-result'>{results[0]?.title2 || "Your site appears to be missing a meta description tag."}</p>

                                                    </div>
                                                </>
                                            )}


                                            {results[1]?.info === "Heading tags" && (
                                                <div className="heading-tags" style={{ marginBottom: '25px' }}>
                                                    <div className="heading">
                                                        <i className="fa-solid fa-check"></i>
                                                        <h2>Heading Tags</h2>
                                                    </div>
                                                    <p className="pdf-intro">
                                                        Heading tags (H1–H6) structure your content for both users and search engines. They highlight key topics, improve readability, and help search engines understand the content hierarchy.
                                                    </p>
                                                    <table className="headTag">
                                                        <thead>
                                                            <tr>
                                                                <th>Header Tag</th>
                                                                <th>Frequency</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => (
                                                                <tr key={tag}>
                                                                    <td>{tag.toUpperCase()}</td>
                                                                    <td>{results[1]?.title1?.[tag] || 0}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    {results[1]?.errors && (
                                                        <span className="error" style={{ paddingLeft: '50px' }}>
                                                            {results[1]?.errors}
                                                        </span>
                                                    )}
                                                </div>
                                            )}


                                            {results[2]?.info === "wordchecker" && (
                                                <>
                                                    <div className="keyword-density" style={{ marginBottom: '25px' }}>
                                                        <div className="heading">
                                                            <i className="fa-solid fa-check"></i>
                                                            <h2>Keyword Density</h2>
                                                        </div>
                                                        <p className="pdf-intro">
                                                            Keyword density refers to how often a target keyword appears in your content compared to the total word count. Maintaining the right balance helps search engines understand your topic without triggering spam penalties. It's key for effective on-page SEO.
                                                        </p>
                                                        <table className="keyword">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ maxWidth: '25%', width: '100%' }}>Keyword</th>
                                                                    <th style={{ maxWidth: '10%', width: '100%' }}>Title</th>
                                                                    <th style={{ maxWidth: '25%', width: '100%' }}>Meta Description Tag</th>
                                                                    <th style={{ maxWidth: '20%', width: '100%' }}>Heading Tag</th>
                                                                    <th style={{ maxWidth: '20%', width: '100%' }}>Page Frequency</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {results[2]?.frequent_keywords.map((keyword, index) => (
                                                                    <tr key={`keyword-${index}`} style={{ maxWidth: '25%', width: '100%' }}>
                                                                        <td>{keyword.keyword}</td>
                                                                        <td>{keyword.title}</td>
                                                                        <td>{keyword.meta_description}</td>
                                                                        <td>{keyword.headings}</td>
                                                                        <td>{keyword.frequency}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="keyword-density key-phrases" style={{ marginBottom: '25px' }}>
                                                        <div className="heading">
                                                            <i className="fa-solid fa-check"></i>
                                                            <h2>Key Phrases</h2>
                                                        </div>
                                                        <p className="pdf-intro">
                                                            Key phrases are specific combinations of words that users commonly search for. Including relevant key phrases in your content helps search engines match your page with user intent, improving visibility and ranking potential.
                                                        </p>
                                                        <table className="keyword">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ maxWidth: '25%', width: '100%' }}>Phrases</th>
                                                                    <th style={{ maxWidth: '10%', width: '100%' }}>Title</th>
                                                                    <th style={{ maxWidth: '25%', width: '100%' }}>Meta Description Tag</th>
                                                                    <th style={{ maxWidth: '20%', width: '100%' }}>Heading Tag</th>
                                                                    <th style={{ maxWidth: '20%', width: '100%' }}>Page Frequency</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {results[2]?.frequent_phrases.map((phrase, index) => (
                                                                    <tr key={`phrase-${index}`} style={{ maxWidth: '25%', width: '100%' }}>
                                                                        <td>{phrase.phrase}</td>
                                                                        <td>{phrase.title}</td>
                                                                        <td>{phrase.meta_description}</td>
                                                                        <td>{phrase.headings}</td>
                                                                        <td>{phrase.frequency}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}


                                            {results[6]?.info === "Alt Tags Check" && (
                                                <div className="image-alt" style={{ marginBottom: '25px' }}>
                                                    <div className="heading">
                                                        <i className={`fa-solid ${results[6]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                        <h2>Image Alt Attributes</h2>
                                                    </div>
                                                    <p className="pdf-intro">
                                                        Alt attributes (or alt text) describe the content of an image for search engines and visually impaired users. They improve accessibility and help images appear in search results, contributing to better SEO and user experience.
                                                    </p>
                                                    <div className="internal-heading_in">
                                                        <div className="internal-heading">
                                                            <h3>Images found without alt text</h3>
                                                            <span>{results[6]?.missing.length}</span>
                                                        </div>
                                                        <p>Ensure to update the alt text for all images</p>
                                                    </div>
                                                </div>
                                            )}

                                            {results[8]?.info === "Social Links Check" && (

                                                <div className="heading-tags social-links" style={{ marginBottom: '25px' }}>
                                                    <div className="heading">
                                                        <i className={`fa-solid ${results[8]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                        <h2>Social Links Check</h2>
                                                    </div>
                                                    <p className="pdf-intro">
                                                        Adding social handle links connects your website visitors to your official social media profiles. It builds trust, boosts brand visibility, and encourages user engagement across multiple platforms.
                                                    </p>
                                                    <table className="headTag">
                                                        <thead>
                                                            <tr>
                                                                <th>Social Media Platform</th>
                                                                <th>URL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {results[8]?.links.length > 0 ? (
                                                                results[8]?.links.map((link, index) => (
                                                                    <tr key={`social-link-${index}`}>
                                                                        <td>{new URL(link).hostname.replace('www.', '').split('.')[0]}</td>
                                                                        <td>{link}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="2">No social links found.</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}



                                            {results[9]?.info === "Favicon check" && (
                                                <div className="favicon-check" style={{ marginBottom: '25px' }}>
                                                    <div className="heading">
                                                        <i className={`fa-solid ${results[9]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                        <h2>Favicon</h2>
                                                    </div>
                                                    <p className="pdf-intro">
                                                        A favicon is the small icon displayed in a browser tab next to your website title. It enhances brand recognition, improves user experience, and makes your site look more professional and trustworthy.
                                                    </p>
                                                    <div className="internal-heading_in">
                                                        <div className="internal-heading">
                                                            <h3>Status</h3>
                                                            <span>{results[9]?.errors ? 'Not Found' : 'Found'}</span>
                                                        </div>
                                                        {results[9]?.errors && (
                                                            <p>{results[9]?.suggestions || 'Please add a favicon to improve branding and recognition.'}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}


                                            {results[10]?.info === "OG Tags" && (
                                                <div className="heading-tags open-graph" style={{ marginBottom: '25px' }}>
                                                    <div className="heading">
                                                        <i className={`fa-solid ${results[10]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                        <h2>Open Graph Tags (OG tags)</h2>
                                                    </div>
                                                    <p className="pdf-intro">
                                                        OG (Open Graph) tags control how your content appears when shared on social media platforms. They define the title, description, and image shown in previews, helping boost clicks, shares, and overall visibility across social networks.
                                                    </p>
                                                    <table className="headTag">
                                                        <thead>
                                                            <tr>
                                                                <th>OG Tag Type</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {results[10]?.title1 === "OG tags found." ? (
                                                                results[10]?.ogTags.map((tag, index) => (
                                                                    <tr key={index}>
                                                                        <td>{tag.property}</td>
                                                                        <td>Found</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="2">No OG tags found.</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                    {results[10]?.errors && (
                                                        <span className="error">{results[10]?.suggestions}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="technical_seo" style={{ marginTop: '80px', marginBottom: '80px' }}>



                            <section className="technical_seo watermarkIn" style={{ marginTop: '80px', marginBottom: '80px' }}>
                                <div id="watermark">

                                </div>

                                <div className="container">
                                    <div className="onPageX" style={{ border: '1px solid rgba(0, 0, 0, 0.10)', background: 'rgba(84, 144, 246, 0.10)' }}>
                                        <div className="seo-result">
                                            <h2>Technical SEO</h2>
                                        </div>


                                        {result.info == "Speed" && (
                                            <div>

                                                <div className="technicalX google-desktop" style={{ padding: '40px', paddingTop: '0px !important' }}>
                                                    {results[5]?.info === "Sitemap.xml check" && (
                                                        <div className="image-alt xml-sitemaps" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[5]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>XML Sitemaps</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                An XML sitemap is a file that lists all important pages of your website, helping search engines crawl and index your content more efficiently. It improves site visibility and ensures that no valuable pages are missed during indexing.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Sitemap URL</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {results[5]?.title1 === "Sitemap.xml not found." ? (
                                                                            <tr>
                                                                                <td colSpan="2">No Sitemap.xml found.</td>
                                                                            </tr>
                                                                        ) : (
                                                                            <tr>
                                                                                <td>{results[5]?.title1}</td>
                                                                                <td>Found</td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {results[5]?.errors && (
                                                                <span className="error">{results[5]?.suggestions}</span>
                                                            )}



                                                        </div>
                                                    )}

                                                    {results[4]?.info === "Robots.txt" && (
                                                        <div className="image-alt xml-sitemaps robots" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[4]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Robots.txt</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                The robots.txt file tells search engine crawlers which pages or sections of your website they can or cannot access. It's essential for managing crawl traffic and preventing indexing of duplicate, sensitive, or irrelevant content.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[4]?.title1}</td>
                                                                            <td>{results[4]?.errors ? 'Not Found' : 'Found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[4]?.errors && (
                                                                <span className="error">{results[4]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[12]?.info === "HTTP/HTTPS Check" && (
                                                        <div className="image-alt xml-sitemaps https-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[12]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>HTTP/HTTPS Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                It indicates whether your website is served over a secure connection. Using HTTPS encrypts data, builds user trust, and is favored by search engines for better rankings and security.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[12]?.title1}</td>
                                                                            <td>{results[12]?.errors ? 'Not Found' : 'Found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[12]?.errors && (
                                                                <span className="error">{results[12]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[15]?.info === "www vs non-www Links Check" && (
                                                        <div className="image-alt xml-sitemaps www-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[15]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>www vs non-www Links Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                Checking www vs non-www ensures your website is consistently accessed using a single preferred version. This avoids duplicate content issues and helps search engines consolidate ranking signals for better SEO performance.

                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[15]?.title1}</td>
                                                                            <td>{results[15]?.errors ? 'Not Found' : 'Found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[15]?.errors && (
                                                                <span className="error">{results[15]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[7]?.info === "Schema Check" && (
                                                        <div className="image-alt xml-sitemaps schema-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[7]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Schema Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                Schema markup helps search engines understand your website content by adding structured data. A schema check ensures your markup is correctly implemented, improving rich search results and boosting your site's visibility.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[7]?.title1}</td>
                                                                            <td>{results[7]?.errors ? 'Not found' : 'Found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[7]?.errors && (
                                                                <span className="error">{results[7]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[3]?.info === "Canonical Tags" && (
                                                        <div className="image-alt xml-sitemaps canonical-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[3]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Canonical Tags</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                Canonical tags tell search engines which version of a webpage is the original, helping to prevent duplicate content issues. Proper use of canonical tags ensures your SEO efforts focus on the preferred URL, improving ranking clarity.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[3]?.title1}</td>
                                                                            <td>{results[3]?.errors ? 'Not Found' : 'Found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[3]?.errors && (
                                                                <span className="error">{results[3]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[13]?.info === "Broken Links Check" && (
                                                        <div className="image-alt xml-sitemaps broken-links-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[13]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Broken Links Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                A broken links check identifies dead or non-functioning links on your website. Fixing these links improves user experience, prevents SEO penalties, and ensures search engines can properly crawl your site.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[13]?.title1}</td>
                                                                            <td>{results[13]?.errors ? 'Broken links found' : 'No broken links found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {results[13]?.brokenLinks && results[13]?.brokenLinks.length > 0 && (
                                                                    <div>
                                                                        <h3>Broken Links</h3>
                                                                        <ul>
                                                                            {results[13]?.brokenLinks.map((link, index) => (
                                                                                <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {results[13]?.errors && (
                                                                <span className="error">{results[13]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[16]?.info === "Redirects Check" && (
                                                        <div className="image-alt xml-sitemaps redirects-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[16]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Redirects Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                A redirection check verifies that URLs correctly redirect visitors and search engines to the intended pages. Proper redirection helps maintain link equity, avoid errors, and improve overall website SEO health.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[16]?.title1}</td>
                                                                            <td>{results[16]?.errors ? 'Found' : 'Not Found'}</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                                {results[16]?.redirects && results[16]?.redirects.length > 0 && (
                                                                    <div>
                                                                        <h3>Redirects</h3>
                                                                        <ul>
                                                                            {results[16]?.redirects.map((redirect, index) => (
                                                                                <li key={index}><a href={redirect} target="_blank" rel="noopener noreferrer">{redirect}</a></li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                        <tr>
                                                                            {results[16]?.redirects && results[16]?.redirects.length > 0 && (
                                                                                <>
                                                                                    <td>Redirects</td>
                                                                                    <td>
                                                                                        {results[16]?.redirects.map((redirect, index) => (
                                                                                            <li key={index}><a href={redirect} target="_blank" rel="noopener noreferrer">{redirect}</a></li>
                                                                                        ))}
                                                                                    </td>
                                                                                </>
                                                                            )}
                                                                        </tr>
                                                                    </tbody>
                                                                </table>


                                                            </div>
                                                            {results[16]?.errors && (
                                                                <span className="error">{results[16]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {results[11]?.info === "Noindex Tag Check" && (
                                                        <div className="image-alt xml-sitemaps noindex-check" style={{ marginBottom: '25px' }}>
                                                            <div className="heading">
                                                                <i className={`fa-solid ${results[11]?.errors ? 'fa-times' : 'fa-check'}`}></i>
                                                                <h2>Noindex Tag Check</h2>
                                                            </div>
                                                            <p className="pdf-intro">
                                                                A noindex tag tells search engines not to index a specific page, keeping it out of search results. Checking for noindex tags ensures that only the right pages are hidden, helping you control your site's visibility effectively.
                                                            </p>
                                                            <div className="internal-heading_in">
                                                                <table className="headTag">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{results[11]?.title1}</td>
                                                                            <td>{results[11]?.errors ? 'Noindex tag found' : 'Noindex tag not found'}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {results[11]?.errors && (
                                                                <span className="error">{results[11]?.suggestions}</span>
                                                            )}
                                                        </div>
                                                    )}



                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </section>


                            <section className="technical_seo" style={{ marginTop: '80px', marginBottom: '80px' }}>

                            <section className="sitePerformance technical_seo watermarkIn" style={{ marginTop: '80px', marginBottom: '80px' }}>
                                <div id="watermark">

                                </div>

                                <div className="container">
                                    <div className="onPageX" style={{ border: '1px solid rgba(0, 0, 0, 0.10)', background: 'rgba(84, 144, 246, 0.10)' }}>
                                        <div className="seo-result">
                                            <h2 className='sitePerformance'>Site Performance</h2>
                                        </div>


                                        {result.info == "Speed" && (
                                            <div>

                                                <div className="technicalX" style={{ padding: '40px', paddingBottom: '0px !important', background: '#fffae5' }}>
                                                    <div className="google_speed">
                                                        <div className='d-flex'>
                                                            <div className='google-speed-higher'>
                                                                <h2>Google's PageSpeed Insights - Mobile</h2>
                                                                <p>Google is indicating that your page is scoring poorly on their Mobile PageSpeed Insights evaluation.</p>

                                                <div className="technicalX" style={{ padding: '40px', paddingBottom: '0px !important' }}>
                                                    <div className="google_speed">
                                                        <div className='d-flex'>
                                                            <div className='google-speed-higher' style={{ maxWidth: '80%', width: '100%' }}>
                                                                <h2 className="text-center">Google's PageSpeed Insights - Desktop </h2>
                                                                <p>Google is indicating that your page is scoring poorly on their Desktop PageSpeed Insights evaluation.</p>
                                                            </div>
                                                            <div className='circleGraph' style={{ maxWidth: '20%', width: '100%' }} >
                                                                <ScoreCirclesDesktop desktopScore={Math.ceil(result.data.desktopScore)} style={{ width: '135px', margin: '0px !important', height: 'fit-content !important' }} />

                                                            </div>
                                                            <ScoreCirclesMobile mobileScore={Math.ceil(result.data.mobileScore)} />
                                                        </div>


                                                    </div>
                                                    <div className="heading-tags social-links" style={{ marginBottom: '25px' }}>
                                                        <table className="headTag" style={{ marginTop: '24px', marginBottom: '35px' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Lab Data</th>
                                                                    <th>Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>First Contentful Paint</td>
                                                                    <td style={{ color: '#FF6C6C' }}>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Speed Index</td>
                                                                    <td style={{ color: '#49BE62' }}>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Largest Contentful Paint</td>
                                                                    <td>3 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Time to Interactive</td>
                                                                    <td>5.2 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Blocking Time</td>
                                                                    <td>0.03 s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table className="headTag" style={{ marginTop: '24px', marginBottom: '80px' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Opportunities</th>
                                                                    <th>Estimated Savings</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Avoid multiple page redirects</td>
                                                                    <td style={{ color: '#FF6C6C' }}>0.63 s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="technicalX google-desktop" style={{ padding: '40px', paddingTop: '0px !important' }}>
                                                    <div className="google_speed">
                                                        <div className='d-flex'>
                                                            <div className='google-speed-higher'>
                                                                <h2>Google's PageSpeed Insights Desktop</h2>
                                                                <p>Google is indicating that your page is scoring poorly on their Desktop PageSpeed Insights evaluation.</p>
                                                            </div>
                                                            <ScoreCirclesDesktop desktopScore={Math.ceil(result.data.desktopScore)} />
                                                        </div>

                                                    </div>
                                                    <div className="heading-tags social-links" style={{ marginBottom: '25px' }}>
                                                        <table className="headTag" style={{ marginTop: '24px', marginBottom: '35px' }}>

                                                    </div>
                                                    <div className='results-loader performance'>
                                                        {scores.filter(score => score.label === 'Performance' && results.length > 0).map((score) => {
                                                            const { label, color } = getGaugeLabel(score.value); return (
                                                                <div key={score.label} style={{ width: '150px', textAlign: 'center' }}>
                                                                    <h2 className='results-heading'>Usability</h2>
                                                                    <CircularProgressbar value={score.value} text={label} styles={buildStyles({ pathColor: color, textColor: '#333', trailColor: '#d6d6d6', })} />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="heading-tags social-links" style={{ marginBottom: '25px', marginTop: '0px !important' }}>
                                                        <table className="headTag" style={{ marginTop: '0px', marginBottom: '35px' }}>

                                                            <thead>
                                                                <tr>
                                                                    <th>Lab Data</th>
                                                                    <th>Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>First Contentful Paint</td>

                                                                    <td style={{ color: '#FF6C6C' }}>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Speed Index</td>
                                                                    <td style={{ color: '#49BE62' }}>2.5 s</td>

                                                                    <td>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Speed Index</td>
                                                                    <td>2.5 s</td>

                                                                </tr>
                                                                <tr>
                                                                    <td>Largest Contentful Paint</td>
                                                                    <td>3 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Time to Interactive</td>
                                                                    <td>5.2 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Blocking Time</td>
                                                                    <td>0.03 s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table className="headTag" style={{ marginTop: '24px', marginBottom: '80px' }}>

                                                        <table className="headTag" style={{ marginTop: '24px' }}>

                                                            <thead>
                                                                <tr>
                                                                    <th>Opportunities</th>
                                                                    <th>Estimated Savings</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Avoid multiple page redirects</td>

                                                                    <td style={{ color: '#FF6C6C' }}>0.63 s</td>

                                                                    <td>0.63 s</td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="heading-tags social-links" style={{ marginBottom: '25px' }}>
                                                        <table className="headTag" style={{ marginTop: '24px', marginBottom: '35px' }}>

                                                    <div className="google_speed mt-3">
                                                        <div className='d-flex'>
                                                            <div className='google-speed-higher' style={{ maxWidth: '80%', width: '100%' }}>
                                                                <h2 className="text-center">Google's PageSpeed Insights - Mobile</h2>
                                                                <p>Google is indicating that your page is scoring poorly on their Mobile PageSpeed Insights evaluation.</p>
                                                            </div>
                                                            <div className='circleGraph' style={{ maxWidth: '20%', width: '100%' }} >
                                                                <ScoreCirclesMobile mobileScore={Math.ceil(result.data.mobileScore)} style={{ margin: '0px !important', height: 'fit-content !important' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="heading-tags social-links" style={{ marginBottom: '25px', marginTop: '0px !important' }}>
                                                        <table className="headTag" style={{ marginTop: '0px', marginBottom: '35px' }}>

                                                            <thead>
                                                                <tr>
                                                                    <th>Lab Data</th>
                                                                    <th>Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>First Contentful Paint</td>
                                                                    <td>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Speed Index</td>
                                                                    <td>2.5 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Largest Contentful Paint</td>
                                                                    <td>3 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Time to Interactive</td>
                                                                    <td>5.2 s</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Blocking Time</td>
                                                                    <td>0.03 s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table className="headTag" style={{ marginTop: '24px' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Opportunities</th>
                                                                    <th>Estimated Savings</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Avoid multiple page redirects</td>
                                                                    <td>0.63 s</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>




                                                </div>
                                            </div>
                                        )}


                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div >




        </div >
    );
};

export default AuditTool;


//