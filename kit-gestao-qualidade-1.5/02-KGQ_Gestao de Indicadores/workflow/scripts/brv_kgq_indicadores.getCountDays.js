function getCountDays(){
	var periodicidade = parseInt(hAPI.getCardValue("periodicity"),10);
	var amount = 0;
	switch(periodicidade)
	{
		case 0:
		{
			amount=1;
			break;
		}
		case 1:
		{
			amount=7;
			break;
		}
		case 2:
		{
			amount=14;
			break;
		}
		case 3:
		{
			amount=1;
			break;
		}
		case 4:
		{
			amount=2;
			break;
		}
		case 5:
		{
			amount=3;
			break;
		}
		case 6:
		{
			amount=6;
			break;
		}
		case 7:
		{
			amount=1;
			break;
		}
	}
	return amount;
}
