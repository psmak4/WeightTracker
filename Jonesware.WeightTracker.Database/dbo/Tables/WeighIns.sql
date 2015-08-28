CREATE TABLE [dbo].[WeighIns]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserId] INT NOT NULL, 
    [Weight] INT NOT NULL, 
    [DateRecorded] DATE NOT NULL, 
    CONSTRAINT [FK_WeighIns_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id])
)
