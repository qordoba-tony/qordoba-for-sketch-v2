// // Needs to be loaded first!
// @import 'framework-utils/qordoba-framework.js'
// @import 'helpers/error-logging.js'
// @import 'helpers/files.js'
// @import 'helpers/utils.js'
// @import 'helpers/manifest.js'
// @import 'helpers/translate.js'
// import 'helpers/qordoba-api.js'
// @import "helpers/qordoba-utils.js"
// @import 'helpers/texts.js'
// @import 'helpers/forms.js'
// @import 'helpers/controller.js'

// var app = [NSApplication sharedApplication];
var qordobaSDK = qordobaSDK || {};

qordobaSDK.common = {
    version: undefined,
    context: undefined,
    command: undefined,
    document: undefined,
    selection: undefined,
    pages: undefined,
    page: undefined,
    artboard: undefined,
    current: undefined,
    token: false,
    init: function(context, currentIsArtboard){
        this.context = context;
        this.document = context.document;
        this.command = context.command;
        this.selection = context.selection;
        this.pages = this.document.pages();
        this.page = this.document.currentPage();
        this.artboard = this.page.currentArtboard();
        this.current = this.artboard || this.page;
        this.version = manifest.getPluginVersion(context);
        this.token = getActiveToken(context);
    }
}

export default qordobaSDK;

// function sketchLog(context,string){
//     if(utils.getDebugSetting(context) == 1)
//     {
//         NSLog(string)
//         errorLogging.write(context,string)
//     }
// }
// /**
//  *
//  * Show Config window to sepicfy the organization id, project id and language id
//  *
// **/
// function fireTranslateForm(all,context){
//     var doc = context.document
//     sketchLog(context,"fireTranslateForm()");
    
//     var currentPage = [doc currentPage]
//     var pageName = [currentPage name];
//     var windowTitle = "Downloading Page '"+pageName+"'"
//     if(all){
//         translate.excludeAllTextLayers(context)
//     }else{
//         var currentPage = [doc currentPage]
//         if(utils.isGeneratedPage(currentPage,context)){
//             fireError("Warning!", "This Page is the translated version. To fetch an updated version of the translation, please pull from the original Page.")
//             return ;
//         }
//     }

//     var width = 463;
//     var height = 396;

//     var windowSendArtboards = [[NSWindow alloc] init]
//     [windowSendArtboards setFrame:NSMakeRect(0, 0, width, height) display:true]
//     [windowSendArtboards setBackgroundColor:NSColor.whiteColor()]
//     windowSendArtboards.movableByWindowBackground  = true
//     [windowSendArtboards setStyleMask:NSBorderlessWindowMask];
//     // Load UI from framework
//     loadCoreFramework(context, gFrameworkName);
//     //COScript.currentCOScript().setShouldKeepAround_(true);
//     var nibUI = LoadNibFromFramework(context, 'DownloadView', ['organizationDropdown', 'projectDropdown','languageDropdown', 'cancelButton', 'downloadButton','goProButton','titleLabel','deatachOption','overrideOption']);

//     [[windowSendArtboards contentView] addSubview:nibUI.view];

//     var projects = [];
//     var organization = null;
//     // Organization
//     var organizations  = utils.getOrganizations()
//     var organizationsCount = [organizations count]
//     var organization = utils.getOrganization()
//     if(!organization){
//         organization = [organizations objectAtIndex:0]
//     }
    
//     var noOrganizations = (organizationsCount == 0)
//     var organizationIndex = 0
//     var organizationNames = []
//     for (i = 0; i < organizationsCount; ++i) {
//             organizationNames.push(organizations[i].name);
//             if(organization.id == organizations[i].id){
//                 organizationIndex = i;
//             }
//     }

//     var titleLabel = nibUI.titleLabel;
//     titleLabel.stringValue = windowTitle;

//     var goProButton = nibUI.goProButton;    
//     var userStatus = getUserStatus(context);
//     if(userStatus != "free"){
//         goProButton.setHidden(true);
//     }
    
//     nibUI.attachTargetAndAction(goProButton, function() {       
//         var url = [NSURL URLWithString:@"https://www.qordoba.com/sketch-professional"];
//         if( ![[NSWorkspace sharedWorkspace] openURL:url] ){
//             sketchLog(context,"Failed to open url:" + [url description])
//         }   
//     });

//     var detachOption = nibUI.deatachOption
//     var overrideOption = nibUI.overrideOption
//     nibUI.attachTargetAndAction(detachOption, function() {      
//         [overrideOption setState:NSOffState];   
//     });
    
//     nibUI.attachTargetAndAction(overrideOption, function() {        
//         [detachOption setState:NSOffState];   
//     });

//     //var progressBar = false;//nibUI.progressBar;
//     var orgDropdown = nibUI.organizationDropdown;
//     [orgDropdown addItemsWithTitles:organizationNames]
//     [orgDropdown selectItemAtIndex:organizationIndex]
//     //var obj = this
//     [orgDropdown setCOSJSTargetFunction:function(sender) {
//         var organizationIndex = [sender indexOfSelectedItem]
//         organization = organizations[organizationIndex]
//         projects = getProjectsArray(organization.id,context)
//         var projectNames = []
//         for (i = 0; i < projects.length; ++i) {
//             projectNames.push(projects[i].name);
//         }
//         projectIndex = 0
//         [projectDropdown removeAllItems]
//         [projectDropdown addItemsWithTitles:projectNames]
//         [projectDropdown selectItemAtIndex:projectIndex]

//         [languageDropdown removeAllItems]
//     }]]



//     //project
//     projects = getProjectsArray(organization.id,context)
//     var projectsCount = projects.length
//     var project = utils.getProject()
//     if(!project){
//         project = projects[0]
//     }
    
//     var noProjects = (projectsCount == 0)
//     var projectIndex = 0
//     var projectNames = []
//     for (i = 0; i < projectsCount; ++i) {
//         projectNames.push(projects[i].name);
//         if(project.id == projects[i].id){
//             projectIndex = i;
//             project = projects[i];
//         }
//     }
    
//     var projectDropdown = nibUI.projectDropdown;
//     [projectDropdown addItemsWithTitles:projectNames]
//     [projectDropdown selectItemAtIndex:projectIndex]
//     [projectDropdown setCOSJSTargetFunction:function(sender) {
//         projectIndex = [sender indexOfSelectedItem]
//         projects = getProjectsArray(organization.id,context)
//         project = projects[projectIndex]
//         [languageDropdown removeAllItems]
//         languages = project.targetLanguages
//         languageNames = utils.getNames(languages)
//         [languageDropdown addItemsWithTitles:languageNames]
//         [languageDropdown selectItemAtIndex:0]
//     }]]
//     ///Language
//     var languageIndex = 0
//     var languageNames = []
//     if(project){
//         var languages = project.targetLanguages
//         var languagesCount = [languages count]
//         var language = utils.getTargetLanguage()
//         if(!language){
//             language = languages[0]
//         }
//         for (i = 0; i < languagesCount; ++i) {
//             languageNames.push(languages[i].name);
//             if(language.id == languages[i].id){
//                 languageIndex = i;
//             }
//         }
//     }
    
//     var languageDropdown = nibUI.languageDropdown;
//     [languageDropdown addItemsWithTitles:languageNames]
//     [languageDropdown selectItemAtIndex:languageIndex]
    
//     var sendButton = nibUI.downloadButton
//     var cancelButton = nibUI.cancelButton
    
    
//     nibUI.attachTargetAndAction(sendButton, function() {
//         languageIndex = [languageDropdown indexOfSelectedItem]
//         language = languages[languageIndex]
        
//         var symbolOption = "detach";
//         if([overrideOption state]){
//             symbolOption = "override";
//         }

//         utils.saveTargetLanguage(language)
//         utils.saveProject(project)
//         utils.saveOrganization(organization)
//         //Translate
//         controller.translateCurrentPage(organization,project,language, symbolOption, context)
        
//         [cancelButton setCOSJSTargetFunction:undefined]
//         [sendButton setCOSJSTargetFunction:undefined]
//         [languageDropdown setCOSJSTargetFunction:undefined]
//         [orgDropdown setCOSJSTargetFunction:undefined]
//         [projectDropdown setCOSJSTargetFunction:undefined]
//         [windowSendArtboards orderOut:nil]
//         [app stopModal] 
//     });

//     nibUI.attachTargetAndAction(cancelButton, function() {      
//         [cancelButton setCOSJSTargetFunction:undefined]
//         [sendButton setCOSJSTargetFunction:undefined]
//         [languageDropdown setCOSJSTargetFunction:undefined]
//         [orgDropdown setCOSJSTargetFunction:undefined]
//         [projectDropdown setCOSJSTargetFunction:undefined]
//         [windowSendArtboards orderOut:nil]
//         [app stopModal]
//     });
    
    
//     [windowSendArtboards setDefaultButtonCell:[sendButton cell]];
//     [app runModalForWindow:windowSendArtboards]
// }

// /*
//  *
//  *
//  *
//  */
// function fireUploadForm(all, context){
//     var doc = context.document
//     sketchLog(context,"fireUploadForm()");
    
//     var currentPage = [doc currentPage]
//     var pageName = [currentPage name];
//     var windowTitle = "Upload Page '"+pageName+"' to Qordoba"
//     // Organization
//     var organizations  = utils.getOrganizations()
//     var organizationsCount = [organizations count]
//     var organization = utils.getOrganization()
//     if(!organization){
//         organization = [organizations objectAtIndex:0]
//     }
//     var noOrganizations = (organizationsCount == 0)
//     var organizationIndex = 0
//     var organizationNames = []
//     for (i = 0; i < organizationsCount; ++i) {
//             organizationNames.push(organizations[i].name);
//             if(organization.id == organizations[i].id){
//                 organizationIndex = i;
//             }
//     }

//     //project
//     var projects = getProjectsArray(organization.id,context)
//     var projectsCount = projects.length
//     var noProjects = (projectsCount == 0)
//     var project = false
//     if(!noProjects){
//         var project = utils.getProject()
//         if(!project){
//             project = projects[0]
//         }
//     }
//     var projectIndex = 0
//     var projectNames = []
//     for (i = 0; i < projectsCount; ++i) {
//             projectNames.push(projects[i].name);
//             if(project.id == projects[i].id){
//                 projectIndex = i;
//             }
//     }

//     var width = 468;
//     var height = 303;

//     var windowSendArtboards = [[NSWindow alloc] init]
//     [windowSendArtboards setFrame:NSMakeRect(0, 0, width, height) display:true]
//     [windowSendArtboards setBackgroundColor:NSColor.whiteColor()]
//     windowSendArtboards.movableByWindowBackground  = true
//     [windowSendArtboards setStyleMask:NSBorderlessWindowMask];

//     // Load UI from framework
//     loadCoreFramework(context, gFrameworkName);
//     //COScript.currentCOScript().setShouldKeepAround_(true);
//     var nibUI = LoadNibFromFramework(context, 'UploadView', ['organizationDropdown', 'projectDropdown', 'cancelButton', 'uploadButton','goProButton','titleLabel']);


//     [[windowSendArtboards contentView] addSubview:nibUI.view];

//     var titleLabel = nibUI.titleLabel;
//     titleLabel.stringValue = windowTitle;



//     var goProButton = nibUI.goProButton;    
//     var userStatus = getUserStatus(context);
//     if(userStatus != "free"){
//         goProButton.setHidden(true);
//     }
    
//     nibUI.attachTargetAndAction(goProButton, function() {       
//         var url = [NSURL URLWithString:@"https://www.qordoba.com/sketch-professional"];
//         if( ![[NSWorkspace sharedWorkspace] openURL:url] ){
//             sketchLog(context,"Failed to open url:" + [url description])
//         }   
//     });
    

//     var orgDropdown = nibUI.organizationDropdown;
//     [orgDropdown addItemsWithTitles:organizationNames];
//     [orgDropdown selectItemAtIndex:organizationIndex];
//     [orgDropdown setCOSJSTargetFunction:function(sender) {
//         var organizationIndex = [sender indexOfSelectedItem]
//         organization = organizations[organizationIndex]
//         projects = getProjectsArray(organization.id,context)
//         projectsCount = projects.length
//         noProjects = (projectsCount == 0)
//         projectNames = []
//         for (i = 0; i < projects.length; ++i) {
//             projectNames.push(projects[i].name);
//         }
//         projectIndex = 0
//         [projectDropdown removeAllItems]
//         [projectDropdown addItemsWithTitles:projectNames]
//         [projectDropdown selectItemAtIndex:projectIndex]
//     }]]


//     var projectDropdown = nibUI.projectDropdown;
//     if(noProjects){
//         var noStringProject = ["No Sketch projects"]
//         [projectDropdown addItemsWithTitles:noStringProject]    
//     }else {
//         [projectDropdown addItemsWithTitles:projectNames]   
//     }
    
//     [projectDropdown selectItemAtIndex:projectIndex]
//     [projectDropdown setCOSJSTargetFunction:function(sender) {
//         projectIndex = [sender indexOfSelectedItem]
//         project = projects[projectIndex]
//     }]]


//     var sendButton = nibUI.uploadButton
//     var cancelButton = nibUI.cancelButton


//     nibUI.attachTargetAndAction(sendButton, function() {        
//          if(noProjects){
//             utils.fireError("No Project Selected!", " There's no project selected.. please choose another organization.")   
//             return ;
//          }
//          [sendButton setTitle:"Uploading ..."]
//          utils.saveProject(project)
//          utils.saveOrganization(organization)
//          //upload pages
//          //controller.uploadCurrentPage(organization, project, context)

//         [cancelButton setCOSJSTargetFunction:undefined]
//         [sendButton setCOSJSTargetFunction:undefined]
//         [orgDropdown setCOSJSTargetFunction:undefined]
//         [projectDropdown setCOSJSTargetFunction:undefined]
//         [windowSendArtboards orderOut:nil]
//         [app stopModal]
//         //upload the page after the modal is stop so we can run on seperate thread!
//         controller.uploadCurrentPage(organization, project, context)
         
//     });

//     nibUI.attachTargetAndAction(cancelButton, function() {
//         [cancelButton setCOSJSTargetFunction:undefined]
//         [sendButton setCOSJSTargetFunction:undefined]
//         [orgDropdown setCOSJSTargetFunction:undefined]
//         [projectDropdown setCOSJSTargetFunction:undefined]
//         [windowSendArtboards orderOut:nil]
//         [app stopModal]
//     });

//     [windowSendArtboards setDefaultButtonCell:[sendButton cell]];
//     [app runModalForWindow:windowSendArtboards]

//     nibUI.destroy();

// }


// // Plugin Calls
// function fireLoginWindowWithContext(context){
//     // create window
//     var loginWindow = [[NSWindow alloc] init]
//     [loginWindow setFrame:NSMakeRect(0, 0, 540, 332) display:false]
//     [loginWindow setBackgroundColor:NSColor.whiteColor()]
        
//     var plugin = context.plugin

//     if(utils.isRetinaDisplay()){
//         var imageFilePath=[plugin urlForResourceNamed:"logo@2x.png"];
//     } else {
//         var imageFilePath=[plugin urlForResourceNamed:"logo.png"];
//     }
//     var imageData = [NSData dataWithContentsOfURL:imageFilePath];
//     var image = NSImage.alloc().initWithData(imageData);

//     var imageView = [[NSImageView alloc] initWithFrame:NSMakeRect(46, 124, 164, 149)];
//     [imageView setImage: image];
//     [[loginWindow contentView] addSubview:imageView];
    
//     // create prompt text
//     var titleField = [[NSTextField alloc] initWithFrame:NSMakeRect(248, 249, 243, 17)]
//     [titleField setEditable:false]
//     [titleField setBordered:false]
//     [titleField setDrawsBackground:false]
//     [titleField setFont:[NSFont boldSystemFontOfSize:15]];
//     [titleField setStringValue:"Use Qordoba & Sketch"]
//     [[loginWindow contentView] addSubview:titleField]
    
//     // create prompt text
//     var subtitleField = [[NSTextField alloc] initWithFrame:NSMakeRect(248, 224, 243, 15)]
//     [subtitleField setEditable:false]
//     [subtitleField setBordered:false]
//     [subtitleField setFont:[NSFont systemFontOfSize:13]];
//     [subtitleField setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]];
//     [subtitleField setDrawsBackground:false]
//     [subtitleField setStringValue:"Sign in and sent artboards to Qordoba!"]
//     [subtitleField sizeToFit]
//     [[loginWindow contentView] addSubview:subtitleField]
    
//     var emailInputField = [[NSTextField alloc] initWithFrame:NSMakeRect(250, 181, 243, 23)]
//     [[emailInputField cell] setPlaceholderString:"Email"]
//     [[loginWindow contentView] addSubview:emailInputField]  
      
//     var passwordField = [[NSSecureTextField alloc] initWithFrame:NSMakeRect(250, 150, 243, 23)]
//     [[passwordField cell] setPlaceholderString:"Password"]
//     [[loginWindow contentView] addSubview:passwordField]    
    
//     var yPosButtons = 102;
    
//     var loginButton = [[NSButton alloc] initWithFrame:NSMakeRect(407, yPosButtons, 92, 46)]
//     var cancelButton = [[NSButton alloc] initWithFrame:NSMakeRect(321, yPosButtons, 92, 46)]
//     var createQordobaButton = [[NSButton alloc] initWithFrame:NSMakeRect(44, 23, 162, 32)]
//     var createHelpButton = [[NSButton alloc] initWithFrame:NSMakeRect(470, 23, 32, 32)]

//     [loginButton setTitle:"Sign in"]
//     [loginButton setBezelStyle:NSRoundedBezelStyle]
//     [loginButton setKeyEquivalent:"\r"]
//     [loginButton setCOSJSTargetFunction:function(sender) {
//         var email = emailInputField.stringValue()
//         var password = passwordField.stringValue()
//         var res = loginWithUsernameAndPassword(email, password, context)
//         if(res){
//             [loginWindow orderOut:nil]
//             [app stopModal]
//             [cancelButton setCOSJSTargetFunction:undefined]
//             [loginButton setCOSJSTargetFunction:undefined]
//             [createQordobaButton setCOSJSTargetFunction:undefined]
//             [createHelpButton setCOSJSTargetFunction:undefined]
//         }
//     }];
//     [loginButton setAction:"callAction:"]
//     [[loginWindow contentView] addSubview:loginButton]
    
    
    
//     [cancelButton setTitle:"Cancel"]
//     [cancelButton setBezelStyle:NSRoundedBezelStyle]
//     [cancelButton setCOSJSTargetFunction:function(sender) {
//         [loginWindow orderOut:nil]
//         [app stopModal]
//         [cancelButton setCOSJSTargetFunction:undefined]
//         [loginButton setCOSJSTargetFunction:undefined]
//         [createQordobaButton setCOSJSTargetFunction:undefined]
//         [createHelpButton setCOSJSTargetFunction:undefined]
//     }];
//     [cancelButton setAction:"callAction:"]
//     [[loginWindow contentView] addSubview:cancelButton]
    

//     //Bottom Bar

//     var bottomActionsView = [[NSView alloc] initWithFrame:NSMakeRect(0, 0, 540, 79)];
//     bottomActionsView.setWantsLayer(true);
//     [[loginWindow contentView] addSubview:bottomActionsView];   
    
//     var backgroundLayer = [CALayer layer];
//     [backgroundLayer setBackgroundColor:CGColorCreateGenericRGB(246/255, 246/255, 246/255, 1.0)]; //RGB plus Alpha Channel
//     [bottomActionsView setLayer:backgroundLayer]
    
//     var borderLayer = [CALayer layer];
//     borderLayer.frame = CGRectMake(0, 78, 540, 1);
//     [borderLayer setBackgroundColor:CGColorCreateGenericRGB(220/255, 220/255, 220/255, 1.0)]; //RGB plus Alpha Channel
//     [backgroundLayer addSublayer:borderLayer];

//     //Create Marvel Button
    
//     [createQordobaButton setTitle:"No account? Sign up"]
//     [createQordobaButton setBezelStyle:NSRoundedBezelStyle]
//     [createQordobaButton setCOSJSTargetFunction:function(sender) {
//         var url = [NSURL URLWithString:@"https://www.qordoba.com/sketch-professional"];
//         if( ![[NSWorkspace sharedWorkspace] openURL:url] ){
//             sketchLog(context,"Failed to open url:" + [url description])
//         }    
//     }];
//     [createQordobaButton setAction:"callAction:"]
//     [bottomActionsView addSubview:createQordobaButton]  
    
//     [createHelpButton setBezelStyle:NSHelpButtonBezelStyle]
//     [createHelpButton setTitle:nil]
//     [createHelpButton setCOSJSTargetFunction:function(sender) {
//         var url = [NSURL URLWithString:@"https://support.qordoba.com"];
//         if( ![[NSWorkspace sharedWorkspace] openURL:url] ){
//             sketchLog(context,"Failed to open url:" + [url description])
//         }
//     }];
//     [createHelpButton setAction:"callAction:"]
//     [bottomActionsView addSubview:createHelpButton]
    

//     [loginWindow setDefaultButtonCell:[loginButton cell]];
    
//     [app runModalForWindow:loginWindow] 
// }

// /**
//  *
//  *
//  *
// **/
// function fireAlreadyLoggedInWindow(context){
    
//     // create window
//     var alreadyLoggedInWindow = [[NSWindow alloc] init]
//     [alreadyLoggedInWindow setFrame:NSMakeRect(0, 0, 540, 332) display:false]
//     [alreadyLoggedInWindow setBackgroundColor:NSColor.whiteColor()]
        
//     var userName =  utils.getUserName(context)
//     var userEmail = utils.getUserEmail(context)
    
//     var width = 540
//     //Logo
//     var plugin = context.plugin
//     if(utils.isRetinaDisplay()){
//         var imageFilePath=[plugin urlForResourceNamed:"logo@2x.png"];
//     } else {
//         var imageFilePath=[plugin urlForResourceNamed:"logo.png"];
//     }
//     var imageData = [NSData dataWithContentsOfURL:imageFilePath];
//     var image = NSImage.alloc().initWithData(imageData);

//     var imageView = [[NSImageView alloc] initWithFrame:NSMakeRect((width - 164)/2 -10, 180, 164, 149)];
//     [imageView setImage: image];
//     [[alreadyLoggedInWindow contentView] addSubview:imageView];
                            
//     // create prompt text
//     var titleField = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 180, 540, 17)]
//     [titleField setEditable:false]
//     [titleField setBordered:false]
//     [titleField setAlignment:2] 
//     [titleField setDrawsBackground:false]
//     [titleField setFont:[NSFont boldSystemFontOfSize:13]];
//     [titleField setStringValue:"Welcome "+userName+"!"]
//     [[alreadyLoggedInWindow contentView] addSubview:titleField]

//     var title2Field  = utils.createLabel("You are logged in under " + userEmail+ ".",NSMakeRect(-110, 160, 540, 17))
//     [[alreadyLoggedInWindow contentView] addSubview:title2Field]

//     // create prompt text
//     var subtitleField = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 120, 540, 30)]
//     [subtitleField setEditable:false]
//     [subtitleField setBordered:false]
//     [subtitleField setAlignment:2] 
//     [subtitleField setFont:[NSFont systemFontOfSize:13]];
//     [subtitleField setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]];
//     [subtitleField setDrawsBackground:false]
//     [subtitleField setStringValue:texts.logout_first_text]
//     [[alreadyLoggedInWindow contentView] addSubview:subtitleField]
    
//     var yPosButtons = 80;
    
//     // Buttons

//     var logoutButton = [[NSButton alloc] initWithFrame:NSMakeRect(267, yPosButtons, 92, 46)]
//     var cancelButton = [[NSButton alloc] initWithFrame:NSMakeRect(181, yPosButtons, 92, 46)]

//     [logoutButton setTitle:"Sign out"]
//     [logoutButton setBezelStyle:NSRoundedBezelStyle]
//     [logoutButton setCOSJSTargetFunction:function(sender) {
//         utils.deleteActiveToken(context)
//         [alreadyLoggedInWindow orderOut:nil]
//         [app stopModal]
//         [logoutButton setCOSJSTargetFunction:undefined]
//         [cancelButton setCOSJSTargetFunction:undefined]
//         fireLoginWindowWithContext(context)
//     }];
//     [logoutButton setAction:"callAction:"]
//     [[alreadyLoggedInWindow contentView] addSubview:logoutButton]
    
    
    
//     [cancelButton setTitle:"Cancel"]
//     [cancelButton setBezelStyle:NSRoundedBezelStyle]
//     [cancelButton setCOSJSTargetFunction:function(sender) {
//         [alreadyLoggedInWindow  orderOut:nil]
//         [app stopModal]
//         [logoutButton setCOSJSTargetFunction:undefined]
//         [cancelButton setCOSJSTargetFunction:undefined]
//     }];
//     [cancelButton setAction:"callAction:"]
//     [[alreadyLoggedInWindow contentView] addSubview:cancelButton]

//     [alreadyLoggedInWindow setDefaultButtonCell:[logoutButton cell]];
    
//     [app runModalForWindow:alreadyLoggedInWindow]
// }

// /**
//  *
//  * Fire Support
//  *
// **/ 
// function fireSupport(context){
//     var systemVersionDictionary = [NSDictionary dictionaryWithContentsOfFile:@"/System/Library/CoreServices/SystemVersion.plist"]
//     var systemVersion = [systemVersionDictionary objectForKey:@"ProductVersion"]
//     var pluginVersion = manifest.getPluginVersion(context)
//     var sketchVersion = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]
        
//     var windowSendArtboards = [[NSWindow alloc] init]
//     [windowSendArtboards setFrame:NSMakeRect(0, 0, 485, 333) display:false]
//     [windowSendArtboards setBackgroundColor:NSColor.whiteColor()]
//     var xPos = 30;
//     var titleField = [[NSTextField alloc] initWithFrame:NSMakeRect(xPos, 235, 540, 17)]
//     [titleField setEditable:false]
//     [titleField setBordered:false]
//     [titleField setDrawsBackground:false]
//     [titleField setFont:[NSFont boldSystemFontOfSize:13]];
//     [titleField setStringValue:"Report a bug"]
//     [[windowSendArtboards contentView] addSubview:titleField]

//     var step1Label = [[NSTextField alloc] initWithFrame:NSMakeRect(xPos, 200, 540, 17)]
//     [step1Label setEditable:false]
//     [step1Label setBordered:false]
//     [step1Label setDrawsBackground:false]
//     [step1Label setFont:[NSFont systemFontOfSize:12]]
//     [step1Label setStringValue:"1. Make sure this checkbox is checked (it will turn on debug mode): "]
//     [step1Label setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]]
//     [[windowSendArtboards contentView] addSubview:step1Label]

//     var step2Label = [[NSTextField alloc] initWithFrame:NSMakeRect(xPos, 172, 540, 17)]
//     [step2Label setEditable:false]
//     [step2Label setBordered:false]
//     [step2Label setDrawsBackground:false]
//     [step2Label setFont:[NSFont systemFontOfSize:12]]
//     [step2Label setStringValue:"2. Close this window and replicate the bug."]
//     [step2Label setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]]
//     [[windowSendArtboards contentView] addSubview:step2Label]

//     var step3Label = [[NSTextField alloc] initWithFrame:NSMakeRect(xPos, 144, 540, 17)]
//     [step3Label setEditable:false]
//     [step3Label setBordered:false]
//     [step3Label setDrawsBackground:false]
//     [step3Label setFont:[NSFont systemFontOfSize:12]]
//     [step3Label setStringValue:"3. Come back to this window and hit send."]
//     [step3Label setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]]
//     [[windowSendArtboards contentView] addSubview:step3Label]
    
//     var bottomActionsView = [[NSView alloc] initWithFrame:NSMakeRect(xPos, 112, 420, 1)]
//     bottomActionsView.setWantsLayer(true)
//     [[windowSendArtboards contentView] addSubview:bottomActionsView]    
        
//     var borderLayer = [CALayer layer]
//     borderLayer.frame = CGRectMake(0, 1, 348, 1)
//     [borderLayer setBackgroundColor:CGColorCreateGenericRGB(220/255, 220/255, 220/255, 1.0)]
//     [bottomActionsView setLayer:borderLayer];

//     var yPosBottomElements = 45;

//     var versionLabel = [[NSTextField alloc] initWithFrame:NSMakeRect(xPos, yPosBottomElements + 5, 266, 26)]
//     [versionLabel setEditable:false]
//     [versionLabel setBordered:false]
//     [versionLabel setAlignment:0] 
//     [versionLabel setFont:[NSFont systemFontOfSize:11]]
//     [versionLabel setTextColor:[NSColor colorWithCalibratedRed:(93/255) green:(93/255) blue:(93/255) alpha:1]]
//     [versionLabel setDrawsBackground:false]
//     [versionLabel setStringValue:"OSX " + systemVersion + " Sketch " + sketchVersion + " Plugin " + pluginVersion]
//     [[windowSendArtboards contentView] addSubview:versionLabel]
    

//     // Buttons

//     var sendButton = [[NSButton alloc] initWithFrame:NSMakeRect(353, yPosBottomElements, 76, 46)]
//     var cancelButton = [[NSButton alloc] initWithFrame:NSMakeRect(283, yPosBottomElements, 76, 46)]
//     var debugCheckbox = [[NSButton alloc] initWithFrame:NSMakeRect (420,195,50,25)]

//     [debugCheckbox setButtonType:NSSwitchButton];
//     [debugCheckbox setTitle:@""];
//     if(utils.getDebugSetting(context) == 1){
//         [debugCheckbox setState:NSOnState];
//     } else {
//         [debugCheckbox setState:NSOffState];
//     }
//     [debugCheckbox setCOSJSTargetFunction:function(sender) {

//         var directory = errorLogging.getLogDirectory(context);
//         errorLogging.removeFileOrFolder(directory + "main.txt")

//         if ([sender state] == NSOnState) {
//             utils.saveDebugSetting(1,context)
//         } else {
//             utils.saveDebugSetting(0,context)
//         }
        
//     }];
//     [[windowSendArtboards contentView] addSubview:debugCheckbox]

//     [sendButton setTitle:"Send"]
//     [sendButton setBezelStyle:NSRoundedBezelStyle]
//     [sendButton setCOSJSTargetFunction:function(sender) {

//             var logs = errorLogging.fetchLog(context);

//             var subject = @"Sketch Plugin Support";
//             var body =[NSString stringWithFormat:@"Describe your bug here: \n\n\n\n\n My Logs:\n\n Plugin Version: %@ \n System Version: %@ \n Sketch Version: %@ \n %@", pluginVersion, systemVersion, sketchVersion, logs];
//             var to = @"support@qordoba.com";
//             var encodedSubject = [NSString stringWithFormat:@"SUBJECT=%@", [subject stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
//             var encodedBody = [NSString stringWithFormat:@"BODY=%@", [body stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
//             var encodedTo = [to stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
//             var encodedURLString = [NSString stringWithFormat:@"mailto:%@?%@&%@", encodedTo, encodedSubject, encodedBody];
//             var mailtoURL = [NSURL URLWithString:encodedURLString];

//             [[NSWorkspace sharedWorkspace] openURL:mailtoURL];

//             [windowSendArtboards orderOut:nil]
//             [app stopModal]
//             [sendButton setCOSJSTargetFunction:undefined]
//             [cancelButton setCOSJSTargetFunction:undefined]
//             [debugCheckbox setCOSJSTargetFunction:undefined]
//     }];
//     [sendButton setAction:"callAction:"]
//     [[windowSendArtboards contentView] addSubview:sendButton]
    
    
//     [cancelButton setTitle:"Close"]
//     [cancelButton setBezelStyle:NSRoundedBezelStyle]
//     [cancelButton setCOSJSTargetFunction:function(sender) {
//         [windowSendArtboards orderOut:nil]
//         [app stopModal]
//         [cancelButton setCOSJSTargetFunction:undefined]
//         [debugCheckbox setCOSJSTargetFunction:undefined]
//         [sendButton setCOSJSTargetFunction:undefined]
//     }];
//     [cancelButton setAction:"callAction:"]
//     [[windowSendArtboards contentView] addSubview:cancelButton]
    
//     [windowSendArtboards setDefaultButtonCell:[sendButton cell]];
    
//     [app runModalForWindow:windowSendArtboards]
// }


// /**
//  *
//  * Api Calls
//  * Helpers
//  *
// **/
// function dealWithErrors(context,data){
//         sketchLog(context,"Received an error from the server")
//         var stringRead = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];    
        
//         var alert = [[NSAlert alloc] init]
//         [alert setMessageText:"Something went wrong..."]
//         [alert setInformativeText:"Please ensure your email and password are correct and internet isn\'t down or a firewall (e.g. Little Snitch) is not blocking any connections to qordoba.com."]

//         if(stringRead != nil && stringRead != ""){
//                 [alert addButtonWithTitle:'Close']
//                 [alert addButtonWithTitle:'Show more details']
//         } else {
//                 [alert addButtonWithTitle:'Close']
//         }
        
//         var responseCode = [alert runModal]
//         sketchLog(context,"Return data " + stringRead)
// }

// function fireError(title,text){
//         [app displayDialog:text withTitle:title]
// }



// var updatesChecker = {
//     getNewestVersionNumber: function(context){
//         sketchLog(context,"updatesChecker.getNewestVersionNumber()")
                
//         var url = [NSURL URLWithString:"https://raw.githubusercontent.com/Qordobacode/qordoba-for-sketch/master/Qordoba.sketchplugin/Contents/Sketch/manifest.json"];

//         var request=[NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:30]
//         [request setHTTPMethod:"GET"]
        
//         var response = nil;
//         var error = nil;
//         sketchLog(context,"NSURLConnection updatesChecker.getNewestVersionNumber()")
//         var data = [NSURLConnection sendSynchronousRequest:request returningResponse:response error:error];
        
//         if (error == nil && data != nil)
//         {       
//           var errorJson;
                    
//             var res = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:errorJson]
            
//             if(errorJson == nil){
//             if(res.version){
//                   return res.version
//             }
//             } else {
//                 sketchLog(context,"NSURLConnection updatesChecker.getNewestVersionNumber() Convert to JSON failed")
//                 return false
//             }

//         } 

//         sketchLog(context,"updatesChecker.getNewestVersionNumber() failed")
//         [app displayDialog:"Try again later..." withTitle:"Could not contact GitHub properly."]
//         return false
//     }
// }

// function fireUpdate(context, showNoUpdate) {
//   var newestVersion = updatesChecker.getNewestVersionNumber(context)
//   var pluginVersion = manifest.getPluginVersion(context)
//   sketchLog(context,"Show Updates: " + showNoUpdate);
//   var dateNow = [NSDate date];
//   utils.setLastVersionChecked(dateNow,context);

//   sketchLog(context,"newestVersion: (" + newestVersion + "),pluginVersion: (" + pluginVersion + ")");
//   if (parseFloat(newestVersion) == parseFloat(pluginVersion) && showNoUpdate == true) {
//     [app displayDialog:"Sketch " + newestVersion + " is currently the newest version available." withTitle:"You’re up-to-date!"]
//   } else if(parseFloat(newestVersion) == parseFloat(pluginVersion)) {
//         sketchLog(context,"Sketch " + newestVersion + " is currently the newest version available.");
//   } else {
//     var alert = [[NSAlert alloc] init]
//     [alert setMessageText:"A new version "+newestVersion+" of Qordoba for Sketch is available."]
//     [alert setInformativeText:"Download the new plugin on GitHub."]
//     [alert addButtonWithTitle:'Close']
//     [alert addButtonWithTitle:'Download the update']
 
//     var responseCode = [alert runModal]
//     if(responseCode == "1001"){
//          var url = [NSURL URLWithString:@"https://github.com/Qordobacode/qordoba-for-sketch/releases/latest"];
//           if( ![[NSWorkspace sharedWorkspace] openURL:url] ){
//               sketchLog(context,"Failed to open url:" + [url description])
//           } 
//     }
//   } 
// }
