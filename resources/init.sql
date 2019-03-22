-- DROP TABLE
DROP TABLE Comments;
DROP TABLE Articles;
DROP TABLE Courses;
DROP TABLE Users;


CREATE TABLE Users(
    userId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userRole ENUM('reader', 'writer', 'admin') NOT NULL,
    userIsMute BOOLEAN,
    userMuteReason VARCHAR(255),
    userPseudo VARCHAR(255) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL
);

CREATE TABLE Courses(
    courseId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    courseName VARCHAR(255) UNIQUE NOT NULL,
    courseDescription TEXT NOT NULL,
    courseStatus ENUM('validated', 'waitingForValidation', 'removed', 'beingWritten') NOT NULL,
    courseWriter INT NOT NULL,
    FOREIGN KEY (courseWriter) REFERENCES Users(userId)
);

CREATE TABLE Articles(
    articleId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    articleTitle VARCHAR(255) NOT NULL,
    articlePreface TEXT NOT NULL,
    articleContent TEXT NOT NULL,
    articleStatus ENUM('validated', 'waitingForValidation', 'removed', 'beingWritten') NOT NULL,
    articleWriter INT NOT NULL,
    articleCourse INT NOT NULL,
    FOREIGN KEY (articleWriter) REFERENCES Users(userId),
    FOREIGN KEY (articleCourse) REFERENCES Courses(courseId)
);

CREATE TABLE Comments(
    commentId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comment TEXT NOT NULL,
    commentStatus ENUM('validated', 'waitingForValidation', 'removed') NOT NULL,
    commentWriter INT NOT NULL,
    commentArticle INT NOT NULL,
    FOREIGN KEY (commentWriter) REFERENCES Users(userId),
    FOREIGN KEY (commentArticle) REFERENCES Articles(articleId)
);

-- INSERT INTO
INSERT INTO Users(userRole,userPseudo,userPassword) VALUES('admin', 'bastien', 'bterrier');
INSERT INTO Users(userRole,userPseudo,userPassword) VALUES('writer', 'cedric', 'cbarret');
INSERT INTO Users(userRole,userPseudo,userPassword) VALUES('reader', 'emilien', 'ewingert');
INSERT INTO Users(userRole,userPseudo,userPassword) VALUES('writer', 'gwenael', 'gsamin');

INSERT INTO Courses(courseName, courseDescription, courseStatus, courseWriter) VALUES('Vim Byte', "Kevin shank swine anim.  Salami consequat kevin kielbasa pariatur culpa shankle biltong beef nostrud pig occaecat sed.  Beef ribs magna flank shankle prosciutto dolore esse eu brisket drumstick jerky buffalo.  Laborum doner short ribs, biltong labore fatback sunt tri-tip aliquip tempor.  Fugiat tri-tip filet mignon pork pig, landjaeger frankfurter velit enim ground round voluptate anim.  Ea cupim sausage occaecat salami beef ribs velit esse tenderloin tail fugiat.", 'validated', 2);
INSERT INTO Courses(courseName, courseDescription, courseStatus, courseWriter) VALUES('Regexp Byte', "Laboris irure aliqua consequat pastrami.  Porchetta consectetur buffalo turkey leberkas fugiat ea shoulder reprehenderit irure culpa.  Eiusmod beef ex fugiat sed biltong duis tri-tip.  Irure mollit nisi adipisicing beef ribs jerky andouille picanha velit fatback anim t-bone minim leberkas turducken.  Sirloin nostrud aliqua, laborum chuck short ribs flank adipisicing deserunt dolore consectetur ribeye buffalo ad.  Incididunt venison andouille, brisket rump dolor ham ribeye cillum nisi capicola.", 'validated', 4);
INSERT INTO Courses(courseName, courseDescription, courseStatus, courseWriter) VALUES('C-WAV Byte', "Cupidatat tail porchetta tongue cillum eiusmod shoulder landjaeger short loin culpa ut consequat veniam.  Salami meatloaf turducken alcatra tempor jerky pancetta nostrud id cow tail nulla quis hamburger.", 'validated', 2);

INSERT INTO Articles(articleTitle, articlePreface, articleContent, articleStatus, articleWriter, articleCourse)
VALUES(
    'Vim 01',
    'Aliquip nostrud landjaeger shankle swine eu.  Ad labore aliqua, ut meatloaf veniam do flank rump tongue mollit.  Corned beef beef tongue.',
    'Non tempor adipisicing meatloaf.  Frankfurter mollit dolor consectetur hamburger beef ribs chicken labore do burgdoggen laborum officia buffalo.  Et rump jowl aliquip corned beef buffalo mollit fugiat exercitation.  Ham hock elit irure meatloaf, ut ut ball tip andouille sint fugiat drumstick occaecat qui.  Kevin nisi frankfurter burgdoggen, alcatra cupidatat swine dolore buffalo.',
    'validated',
    2,
    1
);
INSERT INTO Articles(articleTitle, articlePreface, articleContent, articleStatus, articleWriter, articleCourse)
VALUES(
    'Vim 02',
    'Ea pork loin cupidatat dolore tongue meatball pork chop incididunt mollit commodo magna ullamco labore.',
    'ongue pork belly consequat, excepteur ea kevin jowl.  Veniam ea pancetta shankle burgdoggen.  Rump chicken ham laborum beef ribs chuck spare ribs, shank commodo kevin.  Ipsum pork lorem pancetta kevin eu voluptate sirloin tenderloin, reprehenderit pastrami picanha doner proident.',
    'validated',
    2,
    1
);
INSERT INTO Articles(articleTitle, articlePreface, articleContent, articleStatus, articleWriter, articleCourse)
VALUES(
    'Regexp 01',
    'Tongue ground round pig, exercitation culpa chuck cow.  Enim ad tail bresaola frankfurter ground round.  Brisket labore drumstick pariatur pancetta salami ut.',
    'Porchetta laboris aute, voluptate fatback velit pork loin qui corned beef lorem in nostrud ea ham.  Pariatur leberkas ex cillum magna.  Tail burgdoggen labore tongue chuck andouille eu id proident nisi non aliquip.  Capicola short ribs kielbasa tail pork chop doner landjaeger voluptate tenderloin ut lorem mollit duis ullamco ut.  Kevin commodo in adipisicing in consectetur rump.',
    'validated',
    4,
    2
);
INSERT INTO Articles(articleTitle, articlePreface, articleContent, articleStatus, articleWriter, articleCourse)
VALUES(
    'Regexp 02',
    'Short loin ut ut, meatloaf rump exercitation in in strip steak kevin short ribs et proident.  Shoulder deserunt laboris, incididunt ipsum et pariatur minim non magna aliqua t-bone lorem drumstick beef ribs.  Magna short loin ut pastrami sirloin pork belly.  Veniam short ribs incididunt fugiat in cupidatat meatloaf non sed ut laboris ball tip nulla landjaeger.  Ut do kielbasa occaecat tempor tri-tip ut beef ribs.',
    'Beef ribs aliqua meatball pork belly, frankfurter labore fatback laborum landjaeger lorem kevin ground round occaecat.  Bresaola nulla fugiat consequat nostrud.  Dolore shank excepteur sed.  Proident short ribs fatback pork chop shoulder.  In prosciutto porchetta cupim tri-tip aliquip eiusmod incididunt biltong cillum short loin tenderloin tail.  Drumstick voluptate incididunt ut, pork chop consequat laboris shank chicken duis short ribs pork belly beef turducken.',    'validated',
    1,
    2
);
INSERT INTO Comments(comment, commentStatus, commentWriter, commentArticle)
VALUES(
    'Super article, merci !',
    'validated',
    3,
    2
);
INSERT INTO Comments(comment, commentStatus, commentWriter, commentArticle)
VALUES(
    "Merci, j'ai tout compris maintenant ahah !",
    'validated',
    1,
    2
);