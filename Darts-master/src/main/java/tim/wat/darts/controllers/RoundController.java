package tim.wat.darts.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tim.wat.darts.objects.RemoveObject;
import tim.wat.darts.objects.RoundObject;
import tim.wat.darts.repositories.ContestRepository;
import tim.wat.darts.repositories.PlayerRepository;
import tim.wat.darts.repositories.RoundRepository;
import tim.wat.darts.source.Contest;
import tim.wat.darts.source.Player;
import tim.wat.darts.source.Round;

import java.util.List;

@RestController
public class RoundController {
    @Autowired
    RoundRepository roundRepository;
    @Autowired
    ContestRepository contestRepository;
    @Autowired
    PlayerRepository playerRepository;

    @RequestMapping(value = "/setRound", method = RequestMethod.POST)
    @ResponseBody
    public RoundObject setRound(@RequestParam(value = "amount", defaultValue = "0") int amount,
                                @RequestParam(value = "photoPath", defaultValue = "") String photoPath,
                                @RequestParam(value = "contest", defaultValue = "") long contest,
                                @RequestParam(value = "player", defaultValue = "") long player) {
        Round round = new Round(amount, photoPath);
        Contest contest1 = contestRepository.findById(contest).get();
        round.setContest(contest1);
        Player player1 = playerRepository.findById(player).get();
        round.setPlayer(player1);
        List<Round> rounds = roundRepository.findAllByContestAndPlayer(contest1, player1);
        int fullAmount = rounds.stream().mapToInt(Round::getAmount).sum();
        int newFullAmount = fullAmount + amount;
        if (newFullAmount > 501) {
            round.setAmount(0);
            round.setFullAmount(fullAmount);
            roundRepository.save(round);
            return new RoundObject(round.getId(), 0, fullAmount, photoPath);
        } else if (newFullAmount == 501) {
            round.setFullAmount(newFullAmount);
            contest1.setWinner(player1);
            roundRepository.save(round);
            contestRepository.save(contest1);
            return new RoundObject(round.getId(), amount, newFullAmount, photoPath);
        } else {
            round.setFullAmount(newFullAmount);
            roundRepository.save(round);
            return new RoundObject(round.getId(), amount, newFullAmount, photoPath);
        }
    }

    @RequestMapping(value = "/deleteRound", method = RequestMethod.POST)
    @ResponseBody
    public RemoveObject deleteRound(@RequestParam(value = "id", defaultValue = "") long id) {
        Round round = roundRepository.findById(id).get();
        roundRepository.delete(round);
        return new RemoveObject("Round " + id + " deleted");
    }

    @RequestMapping(value = "/updateRound", method = RequestMethod.POST)
    @ResponseBody
    public RoundObject updateRound(@RequestParam(value = "id", defaultValue = "") long id,
                                   @RequestParam(value = "amount", defaultValue = "0") int amount,
                                   @RequestParam(value = "contest", defaultValue = "") long contest,
                                   @RequestParam(value = "player", defaultValue = "") long player) {
        Round round = roundRepository.findById(id).get();
        Contest contest1 = contestRepository.findById(contest).get();
        round.setContest(contest1);
        Player player1 = playerRepository.findById(player).get();
        round.setPlayer(player1);
        List<Round> rounds = roundRepository.findAllByContestAndPlayer(contest1, player1);
        int fullAmount = rounds.stream().mapToInt(Round::getAmount).sum() - round.getAmount();
        int newFullAmount = fullAmount + amount;
        if (newFullAmount > 501) {
            round.setAmount(0);
            round.setFullAmount(fullAmount);
            roundRepository.save(round);
            return new RoundObject(round.getId(), 0, fullAmount, round.getPhotoPath());
        } else if (newFullAmount == 501) {
            round.setFullAmount(newFullAmount);
            contest1.setWinner(player1);
            roundRepository.save(round);
            contestRepository.save(contest1);
            return new RoundObject(round.getId(), amount, newFullAmount, round.getPhotoPath());
        } else {
            round.setFullAmount(newFullAmount);
            round.setAmount(amount);
            roundRepository.save(round);
            return new RoundObject(round.getId(), amount, newFullAmount, round.getPhotoPath());
        }
    }
}
