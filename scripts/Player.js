class Player
{
    constructor(playerId, name)
    {
        this.signature = Math.random();
        this.playerId = playerId;
        this.displayName = name;

        this.heroes = [];
        this.heroGemType = new Set();
    }

    getTotalHeroAlive() {
        return this.getHerosAlive().length;
    }

    getHerosAlive() {
        return this.heroes.filter(hero => hero.isAlive());
    }
    

    getCastableHeros() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        return arr;
    }

    sameOne(other) {
        return this.signature == other.signature;
    }

    isLose() {
        return !this.firstHeroAlive();
    }

    anyHeroFullMana() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());

        let hero = arr != null && arr != undefined && arr.length > 0 ? arr[0] : null;
        return hero;
    }

    firstHeroAlive() {
        let arr = this.heroes.filter(hero => hero.isAlive());

        let hero = arr != null && arr != undefined && arr.length > 0 ? arr[0] : null;
        return hero;
    }

    getRecommendGemType() {
        this.heroGemType = new Set();

        for (let i = 0; i < this.heroes.length; i++){
            let hero = this.heroes[i];

            for (let j = 0; j < hero.gemTypes.length; j++){
                let gt = hero.gemTypes[j];
                this.heroGemType.add(GemType[gt]);
            }
        }        

        return this.heroGemType;
    }

    firstAliveHeroCouldReceiveMana(type) {
        const res = this.heroes.find(hero => hero.isAlive() && hero.couldTakeMana(type));
        return res;
    }

    monKHeroFullMana() {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        arr.forEach((hero) => {
            if(hero.id == HeroIdEnum.MONK) {
                return hero;
            }
        });
        return null;
    }

    calculateAttackFireSpirit(enemyTarget, numberGemRed) {
        return enemyTarget.attack + numberGemRed;
    }

    getHpTargetEnemy(enemyTarget) {
        return enemyTarget.hp;
    }

    getEnemyHeroToTargetForFireSpirit()
    {
        let arr = this.heroes.filter(hero => hero.isAlive());
        if(arr != null && arr != undefined) {
            let heroMaxAttack = arr[0];
            arr.forEach((hero) => {
                if(hero.attack > heroMaxAttack.attack) {
                    heroMaxAttack = hero;
                }
            });
            return heroMaxAttack;
        }
        return null;
    }

    getHeroCastSkill(numberCastSkillMonK, numberGemRed, targetHero) {
        let arr = this.heroes.filter(hero => hero.isAlive() && hero.isFullMana());
        console.log("array hero", arr);
        if(arr != null && arr != undefined) {

            for (let i = 0; i < arr.length; i++) {
                if (numberCastSkillMonK < 2) {
                    if(arr[i].id == "MONK") {
                        return arr[i];
                    }
                } else {
                    if (arr[i].id == "FIRE_SPIRIT") {
                        if(targetHero != null) {
                            let damageAttack = this.calculateAttackFireSpirit(targetHero, numberGemRed);
                            let enemyHp = this.getHpTargetEnemy(targetHero);
                            let percent = damageAttack / enemyHp * 100;
                            if(percent >= 80){
                                return arr[i];
                            }
                        }
                    } else {
                        if (arr[i].id == "CERBERUS" && arr[i].attack > 10) {
                            return arr[i];
                        }
                    }
                }
            }
        }
        return null;
    }

    clone() {
        const cloned = new Player(this.playerId, this.displayName);
        cloned.heroes = this.heroes.map(hero => hero.clone());
        cloned.heroGemType = new Set(Array.from(this.heroGemType));
        cloned.signature = this.signature;
        cloned.metrics = this.metrics;
        return cloned;
    }
}