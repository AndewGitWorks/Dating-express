-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "telegram_id" TEXT NOT NULL,
    "telegram_username" TEXT,
    "user_name" TEXT NOT NULL,
    "user_age" INTEGER NOT NULL,
    "city_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_extras" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "about_me" TEXT,
    "graduation_id" TEXT,
    "job" TEXT,
    "interestings_extra" TEXT,
    "music_extra" TEXT,

    CONSTRAINT "user_extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graduations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "graduations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interests" (
    "userExtraId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,

    CONSTRAINT "user_interests_pkey" PRIMARY KEY ("userExtraId","interestId")
);

-- CreateTable
CREATE TABLE "music_genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "music_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_music" (
    "userExtraId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "user_music_pkey" PRIMARY KEY ("userExtraId","genreId")
);

-- CreateTable
CREATE TABLE "user_likes" (
    "liker_id" TEXT NOT NULL,
    "liked_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_likes_pkey" PRIMARY KEY ("liker_id","liked_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_extras_user_id_key" ON "user_extras"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "interests_name_key" ON "interests"("name");

-- CreateIndex
CREATE UNIQUE INDEX "music_genres_name_key" ON "music_genres"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_extras" ADD CONSTRAINT "user_extras_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_extras" ADD CONSTRAINT "user_extras_graduation_id_fkey" FOREIGN KEY ("graduation_id") REFERENCES "graduations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_userExtraId_fkey" FOREIGN KEY ("userExtraId") REFERENCES "user_extras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_music" ADD CONSTRAINT "user_music_userExtraId_fkey" FOREIGN KEY ("userExtraId") REFERENCES "user_extras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_music" ADD CONSTRAINT "user_music_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "music_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_liker_id_fkey" FOREIGN KEY ("liker_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_liked_id_fkey" FOREIGN KEY ("liked_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
