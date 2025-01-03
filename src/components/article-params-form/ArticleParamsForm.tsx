import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator/Separator';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	display: ArticleStateType;
	setDisplay: (display: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	display,
	setDisplay,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentDisplay, setCurrentDisplay] = useState(display);

	const asideRef = useRef<HTMLDivElement>(null);

	const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDisplay(currentDisplay);
		setIsMenuOpen(false);
	};

	const resetFormHandler = () => {
		setCurrentDisplay(defaultArticleState);
		setDisplay(defaultArticleState);
	};

	const handleClickOutside = () => {
		setIsMenuOpen(false);
	};

	useOutsideClickClose({
		isMenuOpen,
		rootRef: asideRef,
		onClose: handleClickOutside,
		onChange: handleClickOutside,
	});

	useEffect(() => {
		const closeEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('keydown', closeEsc);

		return () => {
			document.removeEventListener('keydown', closeEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleFontFamilyChange = (item: OptionType) => {
		setCurrentDisplay((prev) => ({ ...prev, fontFamilyOption: item }));
	};

	const handlerFontSizeChange = (item: OptionType) => {
		setCurrentDisplay((prev) => ({ ...prev, fontSizeOption: item }));
	};

	const handlerFontColorChange = (item: OptionType) => {
		setCurrentDisplay((prev) => ({ ...prev, fontColor: item }));
	};

	const handlerBackgroundChange = (item: OptionType) => {
		setCurrentDisplay((prev) => ({ ...prev, backgroundColor: item }));
	};

	const handlerContentWidthChange = (item: OptionType) => {
		setCurrentDisplay((prev) => ({ ...prev, contentWidth: item }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={submitFormHandler}
					onReset={resetFormHandler}>
					<Text as='h2' size={31} weight={800} family={'open-sans'} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={currentDisplay.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='font size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentDisplay.fontSizeOption}
						onChange={handlerFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentDisplay.fontColor}
						onChange={handlerFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentDisplay.backgroundColor}
						onChange={handlerBackgroundChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentDisplay.contentWidth}
						onChange={handlerContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
