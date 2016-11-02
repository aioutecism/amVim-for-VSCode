import * as assert from 'assert';
import * as TestUtil from '../../Util';
import {Position} from 'vscode';

import {Configuration} from '../../../src/Configuration';
import {MotionWord} from '../../../src/Motions/Word';

export function run() {

    Configuration.init();

    test('MotionWord: Japanese', (done) => {
        const sampleList = [
            '、。〈〉《》「」『』【】〜〝〞',
            'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ',
            'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・',
            '！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～｟｠｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
            '一丁丂七丄丅丆万丈三上下丌不与丏䶠䶡䶢䶣䶤䶥䶦䶧䶨䶩䶪䶫䶬䶭䶮䶯䶰䶱䶲䶳䶴䶵',
        ];

        TestUtil.createTempDocument(sampleList.join('')).then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.nextEnd();
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            let fromCharacter = 0;
            for (let i = 0; i < sampleList.length; i++) {
                const toCharacter = fromCharacter + sampleList[i].length - 1;
                assert.equal(apply(fromCharacter), toCharacter);
                fromCharacter += sampleList[i].length;
            }

            done();

        });
    });
}
