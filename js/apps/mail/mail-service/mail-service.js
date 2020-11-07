import { utilService } from '../../../service/util-service.js'

export const mailService = {
    getMails,
    getById,
    remove,
    save,
    countMailUnRead,
    sendNewMail,
    currTime,
    randName
    // addZero
}

const STORAGE_KEY = 'mailDB'


var gMails = []

function getMails() {
    gMails = utilService.loadFromStorage(STORAGE_KEY)
    if (!gMails || !gMails.length) {
        _createMails()
        utilService.storeToStorage(STORAGE_KEY, gMails)

    }
    return Promise.resolve(gMails)
}

function countMailUnRead() {
    var countRead = 0
    gMails.forEach(mail => {
        if (!mail.isRead) countRead++
    })
    return countRead
}

function save(mail) {
    if (mail.id) {
        const mailIdx = gMails.findIndex(currMail => mail.id === currMail.id)
        gMails.splice(mailIdx, 1, mail)
        utilService.storeToStorage(STORAGE_KEY, gMails)
    }
}

function remove(mailId) {
    const idx = gMails.findIndex(mail => mail.id === mailId);
    gMails.splice(idx, 1);
    utilService.storeToStorage(STORAGE_KEY, gMails)
    // return Promise.resolve()
}

function _createMail(subject, body, sentAt) {
    var mail =
    {
        id: utilService.makeId(),
        subject: subject,
        body,
        isRead: Math.random() > 0.5,
        sentAt,
        name: mailService.randName()
    }
    return mail
}

function _createMails() {
    gMails = []
    gMails.unshift(_createMail('Sam Darnold, Cam Newton, Jimmy Garoppolo: What next for NFL\'s uncertain crop of quarterbacks?', 'Sam Darnold, Cam Newton, Jimmy Garoppolo: What next for NFL\'s uncertain crop of quarterbacks? On the latest Inside The Huddle podcast, former Tennessee Titans quarterback Vince Young joins Neil Reynolds and Jeff Reinebold to look at a number of NFL QBs with uncertain futures due to injury, poor play or contract uncertainty; listen to the podcast below...', 'Jun 9'))
    gMails.unshift(_createMail('England\'s Chris Jordan joins Ebony Rainford-Brent', 'England\'s Chris Jordan joins Ebony Rainford-Brent, Nasser Hussain and Rob Key on The IPL Cricket Show Watch The IPL Cricket Show at 6pm on Sky Sports Cricket. This week Kings XI Punjab and England paceman Chris Jordan joins Ebony Rainford-Brent, Nasser Hussain and Rob Key to give their views on who will be crowned IPL champions', 'Jun 16'))
    gMails.unshift(_createMail('Temp Mail on Android', 'Temp Mail on Android Temp Mail developers have rolled out an Android-compatible application to make the mobile experience even easier. Link to the Google Play page that features the downloadable official app On registering, a user is assigned a temporary email address, for example: yrvff5vc@12hosting.net. There are two buttons under the address: Change and Copy. Clicking the Change button will automatically generate a new address instead of the one that was offered first. Clicking the Copy button will copy the email address to the clipboard. There is a big icon under the buttons that indicates the status of incoming messages, with the number of unread messages shown in the little orange circle. To view the incoming messages, a user must click the icon.', 'Jul 22'))
    gMails.unshift(_createMail('Email is deleted automatically within one hour after receipt', 'The Temp-Mail.org disposable email service eradicates the spamming problem from its root by generating temporary email addresses. The service requires no registration; instead, a new address is generated in a click of a button. If you do not like the email address offered to you, you are entitled to click once more to obtain a new address. Temporary email will be useful if you need to sign up on an untrusted website or if registration is required to receive a link for downloading a file. You will download the file and forget about it very soon but the website is going to remember you forever sending you messages. Using Temp-Mail.org, these messages will be delivered to your temporary email address and deleted without disturbing you. Temp-Mail.org benefits: Email is deleted automatically within one hour after receipt Temporary email is not stored on your computer, so there’s no virus threat No phishing messages. Further to that, you can consider not to install needless anti-spam apps or some components of anti-virus software.', 'Aug 13'))
    gMails.unshift(_createMail('Why spam causes harm', 'Why spam causes harm every day, a user has to spend time wading through dozens of unwanted advertising messages and trying to find emails that are not junk spam messages often contain viruses and trojans that can infect your computer if opened spam is often used to disseminate phishing emails that are aimed at obtaining personal and other sensitive information from internet users. Spamming and distribution of scam messages and viruses is booming in many countries worldwide, and it is no exaggeration to say that spam is a training ground for cybercriminals. In this regard, annoying ads are not the key danger. How to combat spam You receive spam since you have exposed your email address on the Internet, especially if specifying your email when signing up on the websites that are not reliable or trustworthy. As a result, spammers get your email address and sink you with junk mail every day. Using a temporary email can fix the problem. Today, there are many services like that, but Temp-Mail.org is one of the easiest and most efficient ways to stop spamming.', 'Aug 30'))
    gMails.unshift(_createMail('Confidentiality of a temporary address', 'Confidentiality of a temporary address This type of email is anonymous for a reason. Complete confidentiality will be provided from the moment you enter the website and until you remove your email at Temp-mail.org. A regular email is completely different: When you register to get a regular email, you will need to provide personal information. However, using a temporary email you don`t need to do it. A regular email address will never delete your emails, while all the letters will be automatically deleted after an hour when you are using a temporary email. A regular email can`t be completely removed. On the other hand, disposable email gives you this option without any problems. Thus, a temporary address has significant advantages in matters of privacy. Using a temporary address is simple and easy While using Temp-mail.org, you will not find any features that aren`t useful. Regular email services, on the other hand, are full of unnecessary features, half of which are unknown to even the most tech-savvy users. The benefits of a disposable email: When you’re registering on a resource that requires an email from a specific country, temporary email will help you out. Online shops usually require you to enter an email address. This is a perfect place to use a temporary email. Otherwise, your inbox will be quickly filled up by promotional emails. You don`t need to enter a captcha when using Temp-mail.org; when creating a regular email, you’re always required to enter a captcha. Temp Mail doesn`t limit users in the number of the emails created from the same IP. Regular emails, however, put a cap on the number of emails that you can create from a single IP address. You can register at Temp Mail in just a couple of seconds while creating a regular email takes at least a couple of minutes. Temporary emails don`t exist long enough to be hacked, whereas regular emails are the primary target for the majority of hackers. There is always a chance that you might forget the password to your regular email; anonymous emails simply don’t have a password.', 'Sep 4'))
    gMails.unshift(_createMail('List of the Best Fake Email Address Generator Tools with Comparison', 'List of the Best Fake Email Address Generator Tools with Comparison: Fake email address is used to remain anonymous on the internet. It can be used for signup, receiving confirmation link, replying to an email or forwarding an email. By using a fake email address you can avoid your personal or official mailbox from getting filled with spam emails. Tip: Creating a disposable email address is advantageous but it will be more comfortable if it is possible with your regular email service provider. There are several activities where it is mandatory to provide an email address such as filling an application form, signing-up or downloading an e-book. Every time we might be hesitant to provide our regular email address, due to safety reasons and sometimes to avoid our inbox getting filled with unwanted spam emails. For these reasons, we can use a fake email address.', 'Sep 19'))
    gMails.unshift(_createMail('Such mail is anonymous as you don’t enter any contact information.', 'Advantages of temporary mail Temporary mail differs from constant. Firstly, you shouldn’t waste your time for registration and for thinking about combinations. Server generates address for itself in seconds. Maybe you’ll choose domain. Such mail is anonymous as you don’t enter any contact information. Take into account that such mail can serve as a mirror for your constant mail or it may exist as independent one. As you see usage of temporary mail has lots of advantages. With the help of our services you can forget about spam and open access for necessary for you information safely.', 'Sep 26'))
    gMails.unshift(_createMail('If registration was done on some services then user can obtain', 'For what purposes is temporary mail needed? Each user of net faced the problem of registration on this or that resource. Specifying our mail box we open the way for advertisements, unnecessary notifications and spam. If registration was done on some services then user can obtain hundreds of useless letters. Among this junk it’s very hard to find necessary messages. The main point about temporary mail is to solve this problem. Now you can make registration on the service giving temporary mail box and you will get needed information but your truthful mailbox won’t be littered. Additional abilities: With the help of temporary mail you can make some useful manipulations, mainly', 'Oct 3'))
    gMails.unshift(_createMail('For what purposes is temporary mail needed?', 'For what purposes is temporary mail needed? Each user of net faced the problem of registration on this or that resource. Specifying our mail box we open the way for advertisements, unnecessary notifications and spam. If registration was done on some services then user can obtain hundreds of useless letters. Among this junk it’s very hard to find necessary messages. The main point about temporary mail is to solve this problem. Now you can make registration on the service giving temporary mail box and you will get needed information but your truthful mailbox won’t be littered. Additional abilities: With the help of temporary mail you can make some useful manipulations, mainly', 'Oct 12'))
    gMails.unshift(_createMail('According to the research performed by Barkly', 'According to the research performed by Barkly, email is the primary way to perform an attack. Most of the malware are delivered through emails. Indeed, Email attack can be a threat to the whole organization too. As per the same research, almost 1 in 131 emails contain malware. Hence, for safety reasons, we should exercise immense care to see that our regular email address will not get filled with spam emails. Thus for these reasons, a fake email address should be used. There are several fake email address generators that are available in the market. We have shortlisted the top temporary email generators for you. Every email generator is different in terms of features, validity for the message & email address, and services offered by them. You can create a disposable email address with your Gmail and Yahoo account as well. But in that case, you will have to filter out the spam emails received. With Fake email generators, spam email will not get delivered to your inbox. Hence using them will be much safer.', 'Oct 17'))
    gMails.unshift(_createMail('Mail - is most advanced throwaway email service that helps you ', 'mail details Disposable email - is a service that allows to receive email at a temporary address that self-destructed after a certain time elapses. It is also known by names like What is Disposable Temporary E-mail? Disposable email - is a service that allows to receive email at a temporary address that self-destructed after a certain time elapses. It is also known by names like : tempmail, 10minutemail, throwaway email, fake-mail or trash-mail. Many forums, Wi-Fi owners, websites and blogs ask visitors to register before they can view content, post comments or download something. Temp-Mail - is most advanced throwaway email service that helps you avoid spam and stay safe.', 'Oct 21'))
    gMails.unshift(_createMail('Motivation: The Scientific Guide on How to Get and Stay Motivated', 'Motivation is a powerful, yet tricky beast. Sometimes it is really easy to get motivated, and you find yourself wrapped up in a whirlwind of excitement. Other times, it is nearly impossible to figure out how to motivate yourself and you\'re trapped in a death spiral of procrastination. This page contains the best ideas and most useful research on how to get and stay motivated. This isn\'t going to be some rah-rah, pumped-up motivational speech. (That\'s not my style.) Instead, we\'re going to break down the science behind how to get motivated in the first place and how to stay motivated for the long-run. Whether you\'re trying to figure out how to motivate yourself or how to motivate a team, this page should cover everything you need to know.', 'Oct 24'))
    gMails.unshift(_createMail('A Brief Guide on How to Sleep Better Every Night', 'If you want to learn how to sleep better, then you\'re in the right place. This guide will walk you through everything you need to know if you want to get better sleep. I\'ll explain the science of sleep and how it works, discuss why many people suffer from sleep deprivation without knowing it, and offer practical tips for getting better sleep and having more energy.', 'Oct 27'))
    gMails.unshift(_createMail('Focus and concentration can be difficult to master.', 'Focus and concentration can be difficult to master. Sure, most people want to learn how to improve focus and boost concentration. But actually doing it? We live in a noisy world and constant distractions can make focus difficult. \n \n Luckily, this page contains the best ideas and top research on how to get and stay focused. We will break down the science behind sharpening your mind and paying attention to what matters. Whether you\'re looking to focus on your goals in life or business, this page should cover everything you need to know.', 'Oct 29'))
    gMails.unshift(_createMail('A Scientific Guide to Setting and Achieving Goals', 'Goal setting is everywhere in our world.  \nWe set goals for our careers, our health, and our lives in general. It seems modern society is always encouraging us to think about the next milestone. However, what we don\'t think about enough is the science and strategy of how to accomplish your goals. That\'s what this guide is here to do. \n \n Whether you\'re setting personal goals or professional goals, this guide will explain everything you need to know. You can click the links below to jump to a particular section or simply scroll down to read everything. At the end of this page, you’ll find a complete list of all the articles I have written on goal setting.', 'Nov 1'))
    gMails.unshift(_createMail('One of the hardest things about improving your life is remembering to practice', 'One of the hardest things about improving your life is remembering to practice what you\'ve learned in a moment of temptation, frustration, or hardship. Anyone can follow a strategy as they read about it, but remembering to stick with it in the real world is tough. \n \n Stories help with that. An engaging story sticks with you in a way that a research finding often can\'t. While JamesClear.com promotes science-backed ideas, we dont shun stories and lessons based on real life.', 'Nov 1'))
    gMails.unshift(_createMail('Everton goalkeeper should trust his instincts, says Carlo Ancelotti', 'Everton manager Carlo Ancelotti does not want Jordan Pickford to change his mentality and has told his goalkeeper to trust his instincts on the pitch.\nThe England No 1 has come under scrutiny for a number of errors already this season and was firmly in the spotlight after his reckless tackle sidelined Liverpool defender Virgil van Dijk for several months.\nHe was benched for last weekend\'s defeat at Newcastle but Ancelotti said he retained his support - echoed by Gareth Southgate who said this week Pickford has no genuine challengers to his England place - and has guaranteed him a start against Manchester United on Saturday.', 'Nov 2'))
    gMails.unshift(_createMail('Bob Baffert has strong hand in Breeders\' Cup Classic', 'The Hall of Fame trainer has three victories in the $6million spectacular to his name - dominating from 2014 to 2016 with Bayern, American Pharoah and Arrogate. \n\n All eyes will be on his team this year in a high-class renewal - with the betting headed by Improbable, who will be joined by Maximum Security and Authentic. \n\n Improbable lowered the colours of Maximum Security in the Awesome Again Stakes at Santa Anita in September, while Kentucky Derby hero Authentic was last seen going down by a neck to top-notch filly Swiss Skydiver in the Preakness Stakes. \n\n Baffert said of Improbable, who will be ridden by Irad Ortiz Jr: "He always showed a lot of talent as a three-year old, but, you know, he wasn\'t really mentally mature, physically mature. We always refer to him as a \'Little Justify\' because hes a beautiful mover - (his) athleticism is just, the way he goes over the ground and his mechanics, but what a difference a year makes. ', 'Nov 3'))
    gMails.unshift(_createMail('What this handout is about', 'Talking about “all of them everywhere” is also called “generic reference.” We use it to make generalizations: to say something true of all the nouns in a particular group, like an entire species of animal. When you mean “all of them everywhere,” you have three article choices: Ø, a/an, the. The choice of article depends on the noun. Ask yourself, “What kind of noun is it?” \n Note: We use this form (the + singular) most often in technical and scientific writing to generalize about classes of animals, body organs, plants, musical instruments, and complex inventions. We do not use this form for simple inanimate objects, like books or coat racks. For these objects, use (Ø + plural). alking about “one of many” is also called “indefinite reference.” We use it when the noun’s exact identity is unknown to one of the participants: the reader, the writer, or both. Sometimes it’s not possible for the reader or the writer to identify the noun exactly; sometimes it’s not important. In either case, the noun is just “one of many.” It’s “indefinite.” When you mean “one of many,” you have two article choices: Ø, a/an. The choice of article depends on the noun. Ask yourself, “What kind of noun is it?”', 'Nov 4'))
    // gMails.push(_createMail('', '', ''))
    // gMails.push(_createMail('', '', ''))
    // gMails.push(_createMail('', '', ''))
    // gMails.push(_createMail('', '', ''))
    
    console.log('craaaa', gMails);

}


function getById(id) {
    const mail = gMails.find(currMail => currMail.id === id)
    return Promise.resolve(mail)
}

function sendNewMail(mail) {
    gMails.unshift(mail)
    utilService.storeToStorage(STORAGE_KEY, gMails)
}

function currTime() {
    var d = new Date()
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
   
    // console.log(h + ":" + m + ':' + s);
    return h + ":" + m 
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function randName() {
    var names = ['Yosi', 'Avi', 'Dana', 'Roni', 'Roi', 'Dan', 'Rami', 'Ran', 'Idan', 'Rotem', 'Ori', 'Itay', 'Tal'];
    var num = utilService.getRandomIntInclusive(0, 12);
    var name = names[num]
    return name
}