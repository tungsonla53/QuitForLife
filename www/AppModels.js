function MenuItemViewModel(description, url, image, processing) {
    var self = this;
    self.description = description;
    self.url = url;
    self.image = image;
    self.processing = processing;
};

function TipModel(tipid, title, description, image, thumb) {
	var self = this;
    self.tipid = tipid;
    self.title = title;
    self.description = description;
    self.image = image;
    self.thumb = thumb;
    self.isNew = ko.observable(true);
    self.imageT = ko.dependentObservable(function () {
        if (window.devicePixelRatio > 1) {
        	var temp_filename = self.image.split('.');
 			return temp_filename[0] + '_@2x.' + temp_filename[1]; 
        }
        else
        {
        	return self.image;
        }
    });
    self.thumbT = ko.dependentObservable(function () {
        if (window.devicePixelRatio > 1) {
        	var temp_filename = self.thumb.split('.');
 			return temp_filename[0] + '_@2x.' + temp_filename[1]; 
        }
        else
        {
        	return self.thumb;
        }
    });
    
    self.titleT = ko.dependentObservable(function () {
        if (self.title.length > 40) {
        	var text = self.title.substring(0,40);
 			return text.substr(0, text.lastIndexOf(' ')) + '...';
        }
        else
        {
        	return self.title;
        }
    });
    
    self.titleS = ko.dependentObservable(function () {
        if (self.title.length > 20) {
        	var text = self.title.substring(0,20);
 			return text.substr(0, text.lastIndexOf(' ')) + '...';
        }
        else
        {
        	return self.title;
        }
    });
    
}

var appViewPath = [ "#introView", "#step1View", "#step2View", "#step3View", "#step3CompletedView", "#congratulationsView"];


var prequitTopPath = [0,1,2,3,4,5,6,7,8,9,
10,11,12,13,14,15,16,
17,18,19,20,21,22,23,
24,
26,
28,
30,
32,
34,
36];
var prequitBottomPath = [0,1,2,3,4,5,6,7,8,9,
10,11,12,13,14,15,16,
17,18,19,20,21,22,23,
25,
27,
29,
31,
33,
35,
37];

var listOfTipsQDMinus = [
                new TipModel('T01',"Congratulations on deciding to quit!",  
                "While quitting can be difficult, you have many resources to help you. Consider seeking help from friends, family, or others in your community.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_01_Congratulations_deciding_to_quit.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_01_Congratulations_deciding_to_quit.jpg'),
                new TipModel('T02',"Pinpoint your reasons for quitting",  
                "Do you have reasons to quit that are meaningful to you? Reasons that come from the heart are more powerful than ultimatums from family members or doctors’ orders. To explore what’s motivating you, list your deeply held values — such as health, family, saving money, or setting an example for your kids — and note whether smoking conflicts with them.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_02_Pinpoint_reasons_for_quitting.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_02_Pinpoint_reasons_for_quitting.jpg'),
                 new TipModel('T03',"Learn from your past quits",  
                 "If you have tried to quit before, know that quitting smoking is a lot like learning to play a musical instrument: It takes practice! Think about what worked in your past quit attempts, no matter how brief they were, and focus on those strategies this time. Also explore new strategies: Use a different medication, enlist a new supporter, better prepare for cravings, and find alternative distractions.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_03_Learn_from_your_past_quits.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_03_Learn_from_your_past_quits.jpg'),
                 new TipModel('T04',"Medication boosts your odds of success",  
                 "Patches, gum and lozenges, known as nicotine replacement therapy (NRT), are medications that will make you less irritable from withdrawal and weaken your cravings, doubling your chances of quitting for good. Talk to a doctor or pharmacist about which NRT medication is right for you.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_04_Medication_boosts_your_odds_of_success.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_04_Medication_boosts_your_odds_of_success.jpg'),
                 new TipModel('T05',"Get help from former smokers",  
                 "You probably know people who have successfully quit smoking. Ask what worked for them, and request their support through your quit. An ally who has quit will know what you are going through.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_05_Get_help_from_former_smokers.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_05_Get_help_from_former_smokers.jpg'),
                new TipModel('T06',"Don’t stress about weight gain",  
                "You might gain some weight when you quit but probably not as much as you fear, and you can always lose it later. Right now, quitting is the most important thing you can do for your health, so don’t worry about your waistline. Taking walks, drinking lots of water, and limiting fatty and sugary foods will help. So will finding non-caloric substitutes for cigarettes, like sugarless gum, straws, or toothpicks.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_06_Dont_stress_about_weight_gain.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_06_Dont_stress_about_weight_gain.jpg'),
                new TipModel('T07',"Understand your smoking patterns",  
                "Track when, where, and what’s happening when you smoke. Do this for a couple of days and you will learn more about your smoking patterns and what triggers your urges to smoke. Also note what you were thinking and feeling and how many cigarettes you smoked.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_07_Understand_your_smoking_patterns.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_07_Understand_your_smoking_patterns.jpg'),
                 new TipModel('T08',"Make your quit public",  
                 "Tell everyone you know that you are going to quit, so when you have a craving, you will have many people in your support crew to call or text. Both former smokers and never-smokers can help by cheering you on or keeping you busy.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_08_Make_your_quit_public.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_08_Make_your_quit_public.jpg'),
                 new TipModel('T09',"Remember past coping strategies",  
                 "With past quits, how did you cope in situations when you couldn’t smoke, like on long flights or at a smoke-free work campus? List strategies that worked and new ones you’d like to try this time.",
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_09_Remember_past_coping_strategies.jpg',
                'images/Tips/01-09_QD_Minus_22-30_Days/Tips_Thumb_09_Remember_past_coping_strategies.jpg'),
                new TipModel('T10',"No, smoking doesn't relieve stress",  
                "Worried about how you'll manage stress when you quit? In truth, smoking creates stress rather than relieves it. Nicotine, a stimulant, raises your heart rate and blood pressure, placing physical stress on your body. And because you're constantly fending off withdrawal, smoking triggers mood swings you otherwise wouldn't experience. Learn healthy stress-relief techniques like brisk walking and taking deep breaths. As every former smoker discovers, cigarettes never solved anything. But giving them up can relieve anxiety and reinforce what a strong person you are.",
                "images/Tips/10_17_QD_Minus_15-21_Days/Tips_10_No_smoking_doesn't_relieve_stress.jpg",
                "images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_10_No_smoking_doesn't_relieve_stress.jpg"),
                new TipModel('T11',"Consider prescription medication",  
                "Have you tried nicotine patches, gum, or lozenges before and want to try something different? Talk to your doctor about prescription medications that could help you quit.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_11_Consider_prescription_meds.jpg',
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_11_Consider_prescription_meds.jpg'),
                new TipModel('T12',"Remind yourself why you're quitting",  
                "To stay motivated as your Quit Date approaches, make a list of reasons you're quitting or gather reminders, like a picture of your children or of healthy lungs. Keep in mind that your circulation and breathing will improve within two weeks!",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_12_Remind_yourself_why_youre_quitting.jpg',
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_12_Remind_yourself_why_youre_quitting.jpg'),
                
                new TipModel('T13',"Track each cigarette you smoke.",  
                "To prepare for your quit, take a day or two to track when, where, and why you are smoking, plus what you are thinking and feeling as you light up. You’ll learn which situations and locations pose your greatest challenges.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_13_Track_each_cigarette_you_smoke.jpg','images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_13_Track_each_cigarette_you_smoke.jpg'),
                new TipModel('T14',"Practice mini-quits.",  
                "Mini-quits are a great way to build confidence and learn coping strategies as you prepare for your Quit Date. Choose a specific time when you smoke, like first thing in the morning or after work, and aim to skip that cigarette by distracting yourself —take a walk, fold laundry, work on a crossword puzzle. You can’t fail at mini-quits because your goal is not to quit smoking. After your mini-quit, you’re expected to smoke — no guilt! But learning what works and what doesn’t during those cravings will increase your chances of quitting successfully.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_14_Practice_mini_quits.jpg','images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_14_Practice_mini_quits.jpg'),
                new TipModel('T15',"Have you practiced mini-quits yet?",  
                "Today, prepare for your quit by skipping a particular cigarette, like your work-break smoke or your after-dinner smoke. Instead, use that time to explore alternative strategies to cope with your cigarette craving. The more you practice now, the more successful you will be later.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_15_Have_you_practiced_mini_quits_yet.jpg','images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_15_Have_you_practiced_mini_quits_yet.jpg'),
                new TipModel('T16',"Assemble your support team.",  
                "Have you told family or friends you are quitting? Gathering support will boost your motivation and give you people to call if you need help down the road. Explain to your allies how they can support you. Sometimes people want to help, but don’t know how.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_16_Assemble_your_support_team.jpg', 'images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_16_Assemble_your_support_team.jpg'),
                new TipModel('T17',"Coping with your top trigger.",  
                "Is there a particular smoking trigger you think will be especially difficult for you to overcome? Is it stress? Your morning coffee? Driving? Today, make a list of coping strategies for that trigger, so you have ideas handy once you quit and the craving hits.",
                'images/Tips/10_17_QD_Minus_15-21_Days/Tips_17_Coping_with_your_top_trigger.jpg', 'images/Tips/10_17_QD_Minus_15-21_Days/Tips_Thumb_17_Coping_with_your_top_trigger.jpg'),
                
                new TipModel('T18',"Picked your medication yet?",  
                "Have you considered nicotine patches, gum, lozenges, or prescription medication? Decide now, so you can have your medication ready on your Quit Date. Speak with a doctor or pharmacist about your options.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_18_Picked_your_medication_yet.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_18_Picked_your_medication_yet.jpg'),
                new TipModel('T19',"Glimpsing your future.",  
                "Your Quit Date is nearing! Quitting is one of the most important decisions you can make for yourself and your future. To keep your motivation high, list the positive changes you’ll experience once you quit. For example, you’ll feel free, save money, smell better, have smoother skin, lower your cancer risk, increase your stamina, and live longer.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_19_Glimpsing_your_future.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_19_Glimpsing_your_future.jpg'),
                 new TipModel('T20',"Planning your quit day.",  
                "Start thinking about your first cigarette-free day. What will you do instead of smoke when you wake up, drink your morning coffee, or drive to work? Prepare for each situation. Also, plan to get rid of all of your tobacco and lighters the night before your Quit Date, so you have nothing around to tempt you.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_20_Planning_your_quit_day.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_20_Planning_your_quit_day.jpg'),
                new TipModel('T21',"Keep practicing coping strategies.",  
                "Choose a time today to go without smoking, whether it’s when you wake up, after lunch, or when you feel stressed at work. When the craving hits, take a walk, read a book, play a game on your phone, or practice deep breathing. Try this once a day until your Quit Date.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_21_Keep_practicing_coping_strategies.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_21_Keep_practicing_coping_strategies.jpg'),
                 new TipModel('T22',"Tell the smokers in your life you’re quitting.",  
                "Do you live or work with smokers or have close friends or family who smoke? Tell them ahead of time that you’re going to quit and that they can support you by not smoking in front of you. Don’t be shy about asking them to smoke outside. It is important for you to carve out at least one tobacco-free space, whether it’s your whole house or just your bedroom.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_22_Tell_smokers_in_life_youre_quitting.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_22_Tell_smokers_in_life_youre_quitting.jpg'),
                 new TipModel('T23',"You can handle stress without smoking!",  
                "Stress is a huge trigger for cigarette cravings and a common cause of relapse, so rehearse healthy ways to cope with life’s demands and worries. Step away for some fresh air, take deep breaths through a straw, talk a brisk walk, call a nonsmoking friend, or listen to music. What sounds good to you?",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_23_You_can_handle_stress_without_smoking.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_23_You_can_handle_stress_without_smoking.jpg'),
                 new TipModel('T24',"Getting anxious as your quit date approaches?",  
                "If you’re nervous — and that’s normal — you can still succeed.  Preparing thoroughly will give you confidence. Review your quit plan and how you’ll cope with cravings. Don’t let fear stop you from making one of the best decisions of your life.",
                'images/Tips/18-24_QD_Minus_8-14_Days/Tips_24_Getting_anxious_as_quit_date_approaches.jpg', 'images/Tips/18-24_QD_Minus_8-14_Days/Tips_Thumb_24_Getting_anxious_as_quit_date_approaches.jpg'),
                 
                 new TipModel('T25',"Start your prescription meds today!",  
                "Are you planning to use bupropion (also called Wellbutrin or Zyban) or varenicline (Chantix) to quit? If so, this is probably the day your doctor recommended you start your medication. If you have questions, ask your doctor or a pharmacist.",
                'images/Tips/25-26_QD_Minus_7_Days/Tips_25_Start_your_prescription_meds_today.jpg', 'images/Tips/25-26_QD_Minus_7_Days/Tips_Thumb_25_Start_your_prescription_meds_today.jpg'),
                 new TipModel('T26',"Rev up your support crew.",  
                "Your Quit Date is only a week away! Talk with your support team now, so they know what type of support you want and understand that you need encouragement, not pushing or nagging.",
                'images/Tips/25-26_QD_Minus_7_Days/Tips_26_Rev_up_your_support_crew.jpg', 'images/Tips/25-26_QD_Minus_7_Days/Tips_Thumb_26_Rev_up_your_support_crew.jpg'),
                 
                 new TipModel('T27',"Secure your medication.",  
                "Are you planning to use the nicotine patches, gum, lozenges, or a combination of two options? Make sure you have what you need and know how to use it correctly. Remember, these medications are designed to prevent cravings, so use them on a schedule, not just when you have a craving. Call a doctor or a pharmacist if you have questions.",
                'images/Tips/27-28_QD_Minus_6_Days/Tips_27_Secure_your_medication.jpg', 'images/Tips/27-28_QD_Minus_6_Days/Tips_Thumb_27_Secure_your_medication.jpg'),
                 new TipModel('T28',"Bid your cigarettes farewell.",  
                "Do you consider cigarettes a friend or source of comfort? Use this week to say goodbye to them. Write them a “break-up” letter, like “I’m moving on because you’re holding me back” or “You’re spending all my money and making me sick — I need to let you go.” Think about how you’ll dump your cigarettes. Will you flush them, soak them in water, or have your children tear them up? Plan your final chapter.",
                'images/Tips/27-28_QD_Minus_6_Days/Tips_28_Bid_your_cigarettes_fairwell.jpg', 'images/Tips/27-28_QD_Minus_6_Days/Tips_Thumb_28_Bid_your_cigarettes_fairwell.jpg'),
                
                 new TipModel('T29',"How’s your motivation holding up?",  
                "Place items around your house to remind you why you’re quitting — for example, pictures of grandchildren or a destination you plan to visit with the money saved. Post sticky notes with motivational statements like 'I am stronger than this urge' or 'No one can make me smoke.'",
                'images/Tips/29-30_QD_Minus_5_Days/Tips_29_Hows_your_motivation_holding_up.jpg', 'images/Tips/29-30_QD_Minus_5_Days/Tips_Thumb_29_Hows_your_motivation_holding_up.jpg'),
                 new TipModel('T30',"Combining quit medications.",  
                "If you have tried nicotine patches before and want something extra, you can use nicotine gum or lozenges along with the patches. Use one piece of gum or one lozenge every 1 to 2 hours while using the patches. This way you can help prevent nicotine cravings, rather than react to them after they are really strong.",
                'images/Tips/29-30_QD_Minus_5_Days/Tips_30_Combining_quit_medications.jpg', 'images/Tips/29-30_QD_Minus_5_Days/Tips_Thumb_30_Combining_quit_medications.jpg'),
                
                 new TipModel('T31',"Remind yourself why you’re quitting.",  
                "As your quit date approaches, review your reasons for quitting. Is it for your health? To save money? To get your stamina or singing voice back? Post your top reason on your fridge or write it on a card and put it in your wallet. Reminders will help you stay strong through the first few days of quitting.",
                'images/Tips/31-32_QD_Minus_4_Days/Tips_31_Remind_yourself_why_youre_quitting.jpg', 'images/Tips/31-32_QD_Minus_4_Days/Tips_Thumb_31_Remind_yourself_why_youre_quitting.jpg'),
                 new TipModel('T32',"Practice driving without smoking.",  
                "Four days until you quit for good! If you smoke while driving, keep your cigarettes in the trunk until you quit to get used to driving without smoking.  Before you quit, clean out your car and get rid of all cigarettes, lighters, and ashtrays. Also clean the interior, so the odor is gone.",
                'images/Tips/31-32_QD_Minus_4_Days/Tips_32_Practice_driving_without_smoking.jpg', 'images/Tips/31-32_QD_Minus_4_Days/Tips_Thumb_32_Practice_driving_without_smoking.jpg'),
                 
                 new TipModel('T33',"Practice being a nonsmoker at work.",  
                "Three more days until your quit date! If you smoke at work, tell your co-workers you’ll be quitting, and ask for support. Practice alternatives to smoking on your work break, such as taking a short walk, checking your social media account, or chatting with nonsmoking co-workers indoors.",
                'images/Tips/33-34_QD_Minus_3_Days/Tips_33_Practice_being_a_nonsmoker_at_work.jpg', 'images/Tips/33-34_QD_Minus_3_Days/Tips_Thumb_33_Practice_being_a_nonsmoker_at_work.jpg'),
                 new TipModel('T34',"Rehearse tobacco-free work breaks.",  
                "Taking breaks at work is a common smoking trigger. Consider why you turn to cigarettes on break. Are you stressed? Do you need a moment away from your desk? Do you enjoy socializing with co-workers? Find an alternative activity that meets your needs.",
                'images/Tips/33-34_QD_Minus_3_Days/Tips_34_Rehearse_tobacco_free_work_breaks.jpg', 'images/Tips/33-34_QD_Minus_3_Days/Tips_Thumb_34_Rehearse_tobacco_free_work_breaks.jpg'),
                 
                 new TipModel('T35',"Alert your support team.",  
                "Today is a good day to check in with your supporters. Are they ready to offer the kind of support you’ve asked for, whether it’s cheerleading via text message, taking you to the movies, or joining you on a hike? Make sure they understand how to help you without being pushy.",
                'images/Tips/35-36_QD_Minus_2_Days/Tips_35_Alert_your_support_team.jpg', 'images/Tips/35-36_QD_Minus_2_Days/Tips_Thumb_35_Alert_your_support_team.jpg'),
                 new TipModel('T36',"It’s time to tobacco-proof.",  
                "As your quit date approaches, begin removing the items that could tempt you to smoke, like lighters and ashtrays. Work on changing your habits, too. If you always smoke on the porch or in a specific chair, avoid those areas for the next few days.",
                'images/Tips/35-36_QD_Minus_2_Days/Tips_36_Its_time_to_tobacco_proof.jpg', 'images/Tips/35-36_QD_Minus_2_Days/Tips_Thumb_36_Its_time_to_tobacco_proof.jpg'),
                
                 new TipModel('T37',"Say goodbye to your smoking stuff.",  
                "Tomorrow is your quit date! Today, toss all your cigarettes, ashtrays, and lighters. Search under your car seats and in the glove box, console, and trunk. Scour your drawers, shelves, and cabinets. Check under sofa cushions and in coat pockets and purses. By removing smoking paraphernalia, you are not only avoiding the temptation, you are starting to live your life as a non-smoker!",
                'images/Tips/37-38_QD_Minus_1_Day/Tips_37_Say_goodbye_to_your_smoking_stuff.jpg', 'images/Tips/37-38_QD_Minus_1_Day/Tips_Thumb_37_Say_goodbye_to_your_smoking_stuff.jpg'),
                 new TipModel('T38',"Shuffle your daily routine.",  
                "Tomorrow is your quit day! Mix up your morning routine to help you avoid urges to smoke. Shower at a different time, drink your morning coffee in a new place or drink tea instead, or brush your teeth the moment you get up. Keep a pack of chewing gum or straws where you normally keep your cigarettes.",
                'images/Tips/37-38_QD_Minus_1_Day/Tips_38_Shuffle_your_daily_routine.jpg', 'images/Tips/37-38_QD_Minus_1_Day/Tips_Thumb_38_Shuffle_your_daily_routine.jpg')       
];

var listOfTipsQD = [

	new TipModel('T39',"Today is your quit date!",  
                "Remember, just because you have a craving does not mean you have to smoke. You can do this! If you feel overwhelmed by a cigarette craving, call a member of your support team or use one of the coping strategies you listed in your quit plan.",
                'images/Tips/39-42_QD/Tips_39_Today_is_your_quit_date.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_39_Today_is_your_quit_date.jpg'),
    new TipModel('T40',"Keep yourself busy",  
                "Congratulations on making it to your quit date! The first five days are often the hardest. Stay busy and keep a supply of substitutes handy for your hands and mouth, like chewing gum, straws, cinnamon sticks, worry beads, or stress balls. Be sure you don’t have access to tobacco, and avoid other smokers. It will get easier!",
                'images/Tips/39-42_QD/Tips_40a_Keep_yourself_busy.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_40a_Keep_yourself_busy.jpg'),
   	new TipModel('T41',"Use your medication correctly",  
                "Today is your quit date! If you are using a quit medication, follow all the instructions. Remember, medications are designed to prevent cravings, not help you react to them, so take them on a regular schedule. If you have questions, contact a doctor or a pharmacist.",
                'images/Tips/39-42_QD/Tips_41_Use_your_medication_correctly.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_41_Use_your_medication_correctly.jpg'), 
    new TipModel('T42',"Are you avoiding temptation?",  
                "Today is your quit date! Make sure you have no cigarettes, lighters, or ashtrays around. Avoid places where you used to smoke and avoid other smokers when possible. If you have a craving, focus on your reasons for quitting. The typical craving lasts less than 5 minutes — you can make it!",
                'images/Tips/39-42_QD/Tips_42_Are_you_avoiding_temptation.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_42_Are_you_avoiding_temptation.jpg')              
               
];

var listOfTipsQDPlus = [

	new TipModel('T43',"You’re in control!",  
                "Urges to smoke are usually the strongest during the first five days after quitting. When you have a strong urge to smoke, tell yourself that you do not have to smoke, even if you want to. Distract yourself by reading, playing a game, working a crossword puzzle, or using an oral substitute, like chewing gum, a straw, or a cinnamon stick. You can do it!",
                "images/Tips/43-49_QD_Plus_1-5_Days/Tips_43_You're_in_control.jpg",
                "images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_43_You're_in_control.jpg"),
    new TipModel('T44',"Bring out all your strategies.",  
                "Congratulations on quitting! The first few days can be challenging, but you can do it. Use your quit medication on a schedule, not only when you have a craving. Follow the plans you made before quitting. If you didn’t already write down your coping strategies, do it right now.",
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_44_Bring_out_all_your_coping_strategies.jpg',
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_44_Bring_out_all_your_coping_strategies.jpg'),
    new TipModel('T45',"You’re already healthier!",  
                "Remember that quitting smoking is the single best thing you can do for your health. Within just 20 minutes of quitting, your blood pressure and heart rate drop to normal. Within 24 hours, your chance of heart attack decreases. You will enjoy more and more health benefits the longer you stay quit. You are adding years and quality to your life!",
                "images/Tips/43-49_QD_Plus_1-5_Days/Tips_45_You're_already_healthier.jpg",
                "images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_45_You're_already_healthier.jpg"),
 	new TipModel('T46',"Get out of your rut.",  
                "To avoid urges to smoke, shake up your routine. Drive a different route to work. Join the nonsmokers in the break room rather than huddle outside with the smokers.   Take a walk after dinner instead of sitting on the porch. Try thinking, “How would a non-smoker approach this?” At this point, that’s who you are!",
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_46_Get_out_of_your_rut.jpg',
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_46_Get_out_of_your_rut.jpg'),
    new TipModel('T47',"Shake up your morning.",  
                "Are you struggling with the urge to smoke in the morning? If possible, sleep a little later so you don’t have time to think about smoking. Also, mix up your morning routine. Shower or brush your teeth immediately after waking up, or eat a nutritious breakfast with the time you would normally spend smoking.",
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_47_Shake_up_your_morning.jpg',
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_47_Shake_up_your_morning.jpg'),
    new TipModel('T48',"Oops — did you take a puff?",  
                "If you’ve had a slip, don’t be hard on yourself, and absolutely do not throw in the towel! Recommit to your quit right away. Think about what prompted your slip and make a plan to deal with the trigger next time. You can do it!",
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_48_Oops_did_you_take_a_puff.jpg',
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_48_Oops_did_you_take_a_puff.jpg'),  
   	new TipModel('T49',"What’s up with that cough?",  
                "If you’re coughing as much or more than when you were smoking, know that this is normal. Your lungs are cleaning themselves, so you are coughing up the tars and other toxins that smoking deposited. In a week or so, your lungs will be much healthier and cleaner, so you’ll cough less. Hang in there!",
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_49_Whats_up_with_that_cough.jpg',
                'images/Tips/43-49_QD_Plus_1-5_Days/Tips_Thumb_49_Whats_up_with_that_cough.jpg'),
                
   new TipModel('T50',"Feel proud of yourself!",  
                "It has been a week since your Quit Date. Give yourself credit for taking on such an important challenge, and keep thinking about why you quit. Remembering your reasons can help you stay tobacco-free through intense cravings.",
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_50_Feel_proud_of_yourself.jpg',
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_50_Feel_proud_of_yourself.jpg'), 
   new TipModel('T51',"Not one puff — ever!",  
                "Is your plan to deal with cravings still working? If you’ve had a slip-up or are still battling urges, mix in some new strategies. Spend more time with nonsmoking friends, exercise more, or spend more time on social media. Remember that even one puff of a cigarette could easily lead you back to a pack a day or more.",
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_51_Not_one_puff_ever.jpg',
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_51_Not_one_puff_ever.jpg'), 
   new TipModel('T52',"Don’t drop your medication.",  
                "Keep using your medication on a regular schedule, even if you feel like you don’t need it. The recommended period of time has been proven to help people stay quit long term. Keep using the patches or prescription medication every day or using the gum or lozenges every one to two hours. If you are using a combination, keep using both medications regularly.",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_52_Don't_drop_your_medication.jpg",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_52_Don't_drop_your_medication.jpg"), 
   new TipModel('T53',"Don’t let a slip become a relapse.",  
                "Many people slip and have a few puffs of a cigarette here and there after quitting. That’s normal, but don’t let a slip become a full-blown relapse. Just because you have a weak moment does not mean you should abandon your quit. Learn from your mistake and make a better plan for battling temptation. You can still be a nonsmoker!",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_53_Don't_let_a_slip_become_relapse.jpg",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_53_Don't_let_a_slip_become_relapse.jpg"), 
   new TipModel('T54',"Your body is healing itself.",  
                "You have been quit for about a week now! How do you feel? Did you know your blood circulation has already improved and your risk of having a heart attack has dropped? Your sense of smell and sense of taste may also be coming to life. Every day you stay quit is another day for your body to heal itself. Keep up the great work!",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_54_Your_body_is_healing_itself.jpg",
                "images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_54_Your_body_is_healing_itself.jpg"), 
   new TipModel('T55',"Celebrate your quit!",  
                "Treat yourself to a movie, a restaurant outing, or a new pair of shoes to recognize your tremendous effort. Quitting is hard, and you’ve made great progress!",
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_55_Celebrate_your_quit.jpg',
                'images/Tips/50-55_QD_Plus_6-10_Days/Tips_Thumb_55_Celebrate_your_quit.jpg'), 
                  
   new TipModel('T56',"Enjoy the fruits of your labor.",  
                "How do you feel? Are you breathing easier? Do you have more energy? Does food taste more flavorful? If you’ve noticed these changes, great! Things are only going to get better from here. If you haven’t noticed these changes yet, be patient. Everyone’s body is different, but you are healthier every day you stay quit!",
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_56_Enjoy_the_fruits_labor.jpg',
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_Thumb_56_Enjoy_the_fruits_labor.jpg'), 
   new TipModel('T57',"Take things one day at a time.",  
                "Don’t worry about staying quit for a month or a year —focus on staying tobacco-free today. Quitting gets easier over time. You have a very high chance of quitting for good after staying quit for 2 weeks!",
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_57_Take_things_one_day.jpg',
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_Thumb_57_Take_things_one_day.jpg'), 
   new TipModel('T58',"Keep up your medication!",  
                "If you are using a medication to help you quit, make sure you continue to use it correctly. If you are using the patches or prescription medication, be sure you are using it every day. If you are using the nicotine gum or lozenges, keep using them on a regular schedule to prevent cravings from happening. For information about quit medications, talk to a doctor or a pharmacist.",
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_58_Keep_using_your_medication.jpg',
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_Thumb_58_Keep_using_your_medication.jpg'), 
   new TipModel('T59',"Keep thinking about why you quit.",  
                "You have done an amazing job. Remembering your reasons for quitting will help keep you motivated and steadfast. If you slip, recommit to your quit process and learn from the experience. Next time you’re in that situation, how can you prevent yourself from smoking?",
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_59_Keep_thinking_about_why_quit.jpg',
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_Thumb_59_Keep_thinking_about_why_quit.jpg'), 
   new TipModel('T60',"The savings are adding up!",  
                "Congratulations! You made it two weeks! Have you calculated how much money you have saved since quitting? Use the savings to buy something special for yourself. You’ve earned it!",
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_60_The_savings_are_adding_up.jpg',
                'images/Tips/56-60_QD_Plus_11-15_Days/Tips_Thumb_60_The_savings_are_adding_up.jpg')
                                         
];

var listOfSpecialTips = [

	new TipModel('S01',"I'm having urges to smoke",  
                "<div ><span>Remember, just because you have a craving does not mean you have to smoke. You can do this! If you feel overwhelmed by a cigarette craving, call a member of your support team or use one of the coping strategies you listed in your quit plan.</span></div><div style='margin-top:10px;' align='center'><table><tr valign='top' align='center'><td width='140'><a style='text-decoration: none;' href='javascript:startContactsActivity();' data-theme='' ><img src='images/Urges_Tip_Icons/urges_call_icon.png'/><br/><span class='c11_6'>Call family or a friend</span></a></td><td width='140' ><a style='text-decoration: none;' href='javascript:LinkToYoutubeVideoList();' data-theme='' ><img src='images/Urges_Tip_Icons/urges_audio_icon.jpg'/><br/><span class='c11_6'>Listen to a mindfulness session</span></a></td></tr><tr valign='top' align='center' ><td width='140' ><a style='text-decoration: none;' href='#editReasonsView' data-theme='' ><img src='images/Urges_Tip_Icons/urges_reasons_icon.png'/><br/><span class='c11_6'>View reasons for quitting</span></a></td><td width='140' ><a style='text-decoration: none;' href='javascript: LinkToQ4lFacebook();' data-theme='' ><img src='images/Urges_Tip_Icons/urges_facebook_icon.png'/><br/><span class='c11_6'>See what our Facebook community is saying</span></a></td></tr></table></div>",
                'images/Blank.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_40b_Im_having_urges_to_smoke.jpg'),
    new TipModel('S02',"I slipped and had a puff",  
                "<div><span>Many people slip after quitting, so forgive yourself. The best thing to do is to learn from your misstep. Think about what led up to your slip.</span><div style='margin-top:20px;' align='center'><img src='images/Tips/39-42_QD/Tips_40c_I_slipped_and_had_a_puff_Artwork_1.jpg'/></a></div>",
                'images/Blank.jpg',
                'images/Tips/39-42_QD/Tips_Thumb_40c_I_slipped_and_had_a_puff.jpg'),
   	new TipModel('S03',"I'm smoking again",  
                "<div align='center' ><span>Don't be discouraged. It takes smokers 8 times on average to successfully quit.<br/> The next time you try could be the time you quit for good!</span></div><div style='margin-top:30px;' align='center' ><a href='#pickDateView' data-theme='' ><img src='images/CTA_Buttons/SetNewQuitDate_Button.png' width='260'  /></a></div>",
                'images/Setup/Step_1_Artwork_1.png',
                'images/Tips/39-42_QD/Tips_Thumb_40d_Im_smoking_again.jpg')                        
];

var listOfRelapseTips = [
	 new TipModel('R01',"Quitting is not easy.",  
                "Most people try to quit many times before being successful. It’s what you choose to do after your relapse that counts. Well done, you have made the right choice in setting a new quit date.",
                'images/Tips/61-67_Relapse/Tips_61_Quitting_is_not_easy.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_61_Quitting_is_not_easy.jpg'), 
   	new TipModel('R02',"Avoid the urge and stay focused.",  
                "It doesn’t matter how many cigarettes you had, relapsing is a common step in the quitting process. Ask yourself what caused the relapse and use that information to develop new ways to manage urges.  It’s time to prepare yourself for your new quit date!",
                'images/Tips/61-67_Relapse/Tips_62_Avoid_the_urge_and_stay_focused.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_62_Avoid_the_urge_and_stay_focused.jpg'),
   new TipModel('R03',"Don’t forget your medication.",  
                "Medication can help you get through those tougher cravings.  Having slips here and there are normal but get informed and if you don’t use a quit medicine, consider trying one this next time.",
                'images/Tips/61-67_Relapse/Tips_63_Dont_forget_your_medication.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_63_Dont_forget_your_medication.jpg'), 
   new TipModel('R04',"It’s never too late to start again.",  
                "Relapsing back into smoking is part of the quitting process. Just because you went back to smoking doesn’t mean you can’t quit again. You’ve set a new quit date, so over the next few days use what you learned from your recent attempt.",
                'images/Tips/61-67_Relapse/Tips_64_Its_never_too_late_to_start_again.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_64_Its_never_too_late_to_start_again.jpg'),              
   new TipModel('R05',"Keep up your medication!",  
                "Quitting takes time and practice. You’ve set a new quit date so make sure you have your medication. If you are out of medication talk to your doctor or visit your local pharmacy to get over-the-counter products like the nicotine patches, gum, and lozenges.",
                'images/Tips/61-67_Relapse/Tips_65_Keep_up_your_medication.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_65_Keep_up_your_medication.jpg'), 
   new TipModel('R06',"Remind yourself why you want to quit.",  
                "It’s always important to figure out new coping skills when you relapse. That way you don’t relapse for the same reason. Spend a few minutes thinking about why you wanted to quit and the situation or thoughts that caused you to start smoking again.  It’s time to create a new plan for success!",
                'images/Tips/61-67_Relapse/Tips_66_Remind_yourself_why_you_want_to_quit.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_66_Remind_yourself_why_you_want_to_quit.jpg'), 
   new TipModel('R07',"Be positive and prepared to succeed!",  
                "You’ve spent the last few days preparing for your new quit date. Be positive and remember your new coping skills, making sure that your medication is out and ready to use on your quit date.",
                'images/Tips/61-67_Relapse/Tips_67_Be_positive_and_prepared_to_succeed.jpg',
                'images/Tips/61-67_Relapse/Tips_Thumb_67_Be_positive_and_prepared_to_succeed.jpg')                                                        
	                       
];


function QuitReasonModel(reasonid, description, notification, image) {
    self = this;
    self.reasonid = reasonid;
    self.description = description;
    self.notification = notification;
    self.image = image;
    self.isChecked = ko.observable(false);
    self.isUnChecked = ko.observable(true);
    self.imageT = ko.dependentObservable(function () {
        if (window.devicePixelRatio > 1) {
        	var temp_filename = self.image.split('.');
 			return temp_filename[0] + '_@2x.' + temp_filename[1]; 
        }
        else
        {
        	return self.image;
        }
    });
}

var listOfReasons = [
                new QuitReasonModel('R01', "To prove that I can quit.", "to prove that you can quit.", 'images/Reasons_to_Quit/Reasons_To_Quit_1.jpg'),
                new QuitReasonModel('R02', "I want my freedom back.","to get your freedom back.",  'images/Reasons_to_Quit/Reasons_To_Quit_2.jpg'),
                new QuitReasonModel('R03', "To be more productive at work.", "to be more productive at work.", 'images/Reasons_to_Quit/Reasons_To_Quit_3.jpg'),
                new QuitReasonModel('R04', "To lower my insurance rates.", "to lower your insurance rates.", 'images/Reasons_to_Quit/Reasons_To_Quit_4.jpg'),
                new QuitReasonModel('R05', "Smoking conflicts with my core values.", "because smoking conflicts with your core values.", 'images/Reasons_to_Quit/Reasons_To_Quit_5.jpg'),
                new QuitReasonModel('R06', "I want more energy and stamina.","because you want more energy and stamina.",  'images/Reasons_to_Quit/Reasons_To_Quit_6.jpg'),
                new QuitReasonModel('R07', "To get rid of smoker's breath.", "to get rid of smoker's breath.", 'images/Reasons_to_Quit/Reasons_To_Quit_7.jpg'),
                new QuitReasonModel('R08', "To save money.","to save money.",  'images/Reasons_to_Quit/Reasons_To_Quit_8.jpg'),
                new QuitReasonModel('R09', "I want clear skin.", "because you want clear skin.", 'images/Reasons_to_Quit/Reasons_To_Quit_9.jpg'),
                new QuitReasonModel('R10', "I want clean, white teeth.","because you want clean, white teeth.",  'images/Reasons_to_Quit/Reasons_To_Quit_10.jpg'),
                new QuitReasonModel('R11', "To lower my risk of diabetes.","to lower your risk of diabetes.",  'images/Reasons_to_Quit/Reasons_To_Quit_11.jpg'),
                new QuitReasonModel('R12', "To live a long and healthy life.", "to live a long and healthy life.", 'images/Reasons_to_Quit/Reasons_To_Quit_12.jpg'),
                new QuitReasonModel('R13', "To lower my blood pressure.","to lower your blood pressure.",  'images/Reasons_to_Quit/Reasons_To_Quit_13.jpg'),
                new QuitReasonModel('R14', "To reduce my risk of heart disease.", "to reduce your risk of heart disease.", 'images/Reasons_to_Quit/Reasons_To_Quit_14.jpg'),
                new QuitReasonModel('R15', "To reduce my risk of stroke.", "to reduce your risk of stroke.", 'images/Reasons_to_Quit/Reasons_To_Quit_15.jpg'),
                new QuitReasonModel('R16', "To reduce my risk of cancer.", "to reduce your risk of cancer.", 'images/Reasons_to_Quit/Reasons_To_Quit_16.jpg'),
                new QuitReasonModel('R17', "I'll be better able to recover from surgery.","because you’ll be better able to recover from surgery.",  'images/Reasons_to_Quit/Reasons_To_Quit_17.jpg'),
                new QuitReasonModel('R18', "I want to be better at playing sports.", "because you want to be better at playing sports.", 'images/Reasons_to_Quit/Reasons_To_Quit_18.jpg'),
                new QuitReasonModel('R19', "I want to set a better example for my kids.", "because you want to set a better example for your kids.", 'images/Reasons_to_Quit/Reasons_To_Quit_19.jpg'),
                new QuitReasonModel('R20', "I want to kiss my significant other without feeling self-conscious.", "because you want to kiss your significant other without feeling self-conscious.", 'images/Reasons_to_Quit/Reasons_To_Quit_20.jpg'),
                new QuitReasonModel('R21', "To prevent COPD.","to prevent COPD.",  'images/Reasons_to_Quit/Reasons_To_Quit_21.jpg'),
                new QuitReasonModel('R22', "To keep my COPD from getting worse.", "to keep your COPD from getting worse.", 'images/Reasons_to_Quit/Reasons_To_Quit_22.jpg'),
                new QuitReasonModel('R23', "I'm tired of getting bronchitis!","because you’re tired of getting bronchitis!",  'images/Reasons_to_Quit/Reasons_To_Quit_23.jpg'),
                new QuitReasonModel('R24', "To have a better sense of smell.","to have a better sense of smell.",  'images/Reasons_to_Quit/Reasons_To_Quit_24.jpg'),
                new QuitReasonModel('R25', "My kids/grandkids want me to quit.","because your kids want you to quit.",  'images/Reasons_to_Quit/Reasons_To_Quit_25.jpg'),
                new QuitReasonModel('R26', "My significant other wants me to quit.", "because your significant other wants you to quit.", 'images/Reasons_to_Quit/Reasons_To_Quit_26.jpg'),
                new QuitReasonModel('R27', "I want to set an example to others.", "because you want to set an example to others.", 'images/Reasons_to_Quit/Reasons_To_Quit_27.jpg'),
                new QuitReasonModel('R28', "I don't want my kids to start smoking.", "because you want to set an example to others.", 'images/Reasons_to_Quit/Reasons_To_Quit_28.jpg'),
                new QuitReasonModel('R29', "To protect my family from secondhand smoke.", "to protect your family from secondhand smoke.", 'images/Reasons_to_Quit/Reasons_To_Quit_29.jpg'),
                new QuitReasonModel('R30', "To protect my pet(s) from secondhand smoke.","to protect your pet(s) from secondhand smoke.",  'images/Reasons_to_Quit/Reasons_To_Quit_30.jpg'),
                new QuitReasonModel('R31', "I made a promise to myself that I'd quit.", "because you made a promise to yourself that you’d quit.", 'images/Reasons_to_Quit/Reasons_To_Quit_31.jpg'),
                new QuitReasonModel('R32', "I believe I can quit for good.", "because you believe you can quit for good.", 'images/Reasons_to_Quit/Reasons_To_Quit_32.jpg'),
                new QuitReasonModel('R33', "I'm tired of being judged by others for smoking.", "because you’re tired of being judged by others for smoking.", 'images/Reasons_to_Quit/Reasons_To_Quit_33.jpg'),
                new QuitReasonModel('R34', "I want people to stop nagging me about quitting.", "because you want people to stop nagging you about quitting.", 'images/Reasons_to_Quit/Reasons_To_Quit_34.jpg'),
                new QuitReasonModel('R35', "I want to get in shape.","because you want to get in shape.",  'images/Reasons_to_Quit/Reasons_To_Quit_35.jpg'),
                new QuitReasonModel('R36', "To have enough energy to keep up with my kids!", "to have enough energy to keep up with your kids!", 'images/Reasons_to_Quit/Reasons_To_Quit_36.jpg')
            ];

function NotificationTime(timeid, title, detail) {
    self = this;
    this.timeid = timeid;
    this.title = title;
    this.detail = detail;
    self.isChecked = ko.observable(false);
    self.isUnChecked = ko.observable(true);
}

var listOfNotificationTime = [
                new NotificationTime('1', 'Morning', '(8 AM)'),
                new NotificationTime('2', 'Afternoon', '(1 PM)'),
                new NotificationTime('3', 'Evening', '(7 PM)')
];

var CongratulationPostquitTip = 
	new TipModel('Q01',"Congratulations on making it to your Quit Date!",  
                "The first 5 days are often the hardest. Don't go near tobacco - make sure you've gotten rid of all your cigarettes and avoid other smokers. Your hands and mouth will feel strange without a cigarette, so make sure to keep them busy. Chew gum, a straw, or even a pen.  Don't worry - it will get easier!",
                "images/Tips/Tips_00_Post_Quit_Congratulations.jpg",
                "images/Tips/Tips_Thumb_00_Post_Quit_Congratulations.jpg");
                
            